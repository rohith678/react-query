import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { useQuery } from '@tanstack/react-query';
import {fetchEvents} from '../../utils/Http.jsx';

export default function NewEventsSection() {
  
  const {data, isError, error, isFetching} = useQuery({queryFn: fetchEvents, queryKey:['fetch']})

  let content;

  if (isFetching) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events" />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
