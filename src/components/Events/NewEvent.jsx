import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../utils/Http.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  const {mutate, isLoading , isError , error} = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey:['fetch']})
      navigate("/events");
    }
  });

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}> 
      {
        isLoading && "Submitting..."
      }
      {
        !isLoading &&
        (<>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)
      }
      </EventForm>
      {
        isError && <ErrorBlock title="Failed to Create Event" message="Failed somehow" />
      }
      
    </Modal>
  );
}
