import styled from 'styled-components';
import PlusOneRSVP from './PlusOneRSVP';

export const GuestStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem 0;
  h3 {
    margin-right: 2rem;
  }

  input[type='radio'] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  /* input[type='checkbox'] {
    margin: 0;
    padding: 0;
  } */

  label {
    background: none;
    color: var(--lightViolet);
    border: 1px solid var(--lightViolet);
    padding: 1rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--lightAccent);
    text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      --cast: 4px;
    }
    &:active {
      --cast: 2px;
    }
  }

  label:hover {
    background-color: var(--lightViolet);
    color: var(--black);
  }

  input[type='radio']:checked + label {
    background: var(--lightViolet);
    color: var(--black);
    border: 0;
  }

  input[type='radio']:focus + label {
    background: var(--primary);
    color: var(--black);
    border: 0;
  }
`;

export default function GuestRSVP({ guest, inputs, handleChange }) {
  if (!guest) {
    return <p>Loading...</p>;
  }

  // const [plusOne, setPlusOne] = useState(
  //   guest?.rsvpStatus === 'accepted' && guest?.plusOne
  // );

  return (
    <>
      <GuestStyles key={guest.id}>
        <h3>
          {guest.firstName} {guest.lastName}
        </h3>
        <input
          type="radio"
          id={`${guest.id}_accepted`}
          name={`${guest.id}_rsvpStatus`}
          value="accepted"
          checked={inputs[guest.id]?.rsvpStatus === 'accepted'}
          onChange={handleChange}
        />
        <label htmlFor={`${guest.id}_accepted`}>
          {inputs[guest.id]?.rsvpStatus === 'accepted' ? 'Accepted' : 'Accept'}
        </label>
        <input
          type="radio"
          id={`${guest.id}_declined`}
          name={`${guest.id}_rsvpStatus`}
          value="declined"
          checked={inputs[guest.id]?.rsvpStatus === 'declined'}
          onChange={handleChange}
        />
        <label htmlFor={`${guest.id}_declined`}>
          {inputs[guest.id]?.rsvpStatus === 'declined' ? 'Declined' : 'Decline'}
        </label>
      </GuestStyles>
      {guest?.hasPlusOne && inputs[guest?.id]?.rsvpStatus === 'accepted' ? (
        <PlusOneRSVP
          guest={guest}
          inputs={inputs}
          handleChange={handleChange}
        />
      ) : (
        ''
      )}
    </>
  );
}
