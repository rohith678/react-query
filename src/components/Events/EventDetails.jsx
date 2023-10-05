import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useQuery , useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Header from '../Header.jsx';
import {fetchEvent , deleteEvent , queryClient} from '../../utils/Http.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const {data, isError, error, isFetching} =useQuery({
    queryKey: ['fetch-single', params.id],
    queryFn: ()=> fetchEvent({id:params.id})
  })

  const {mutate}=useMutation(
    {
    mutationFn:deleteEvent,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['fetch']})
      navigate("/events");
    }
  })

  const handleDelete = () => {
    mutate({id: params.id})
  }

  let content;
  if(isFetching) {
    content = <div id='event-details-content' className='center'>
      <p>Fetching Event Data</p>
    </div>
  }

  if(isError) {
    content = <div id='event-details-content' className='center'>
     <ErrorBlock title = "Failed to load event" message="Failed Message"/>
    </div>
  }

  if(data) {
    content=
    <>
    <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
    <img src={`http://localhost:3000/${data.image}`} alt="An Image" />
    <div id="event-details-info">
      <div>
        <p id="event-details-location">{data.location}</p>
        <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
      </div>
      <p id="event-details-description">{data.description}</p>
    </div>
  </div>
  </>
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        
        {content}
      </article>
    </>
  );
}
