import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
}

interface PlusOneRSVPProps {
  guest: Guest;
  inputs: Record<string, { plusOne?: boolean; plusOneFirstName?: string; plusOneLastName?: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
}

const PlusOneStyles = styled.div`
  display: grid;
  gap: 1rem;

  .plusone__names {
    display: grid;
    gap: 1.2rem;
  }

  .checkbox {
    display: grid;
    grid-template-columns: min-content auto;
    align-items: center;
    align-content: center;
    gap: 0.5rem;
    font-size: 2rem;

    .checkbox__input {
      display: grid;
      grid-template-areas: 'checkbox';

      > * {
        grid-area: checkbox;
      }
    }

    .checkbox__input input:checked + .checkbox__control svg {
      transform: scale(1);
    }

    .checkbox__input input:focus + .checkbox__control {
      box-shadow: var(--level-2-primary);
    }

    .checkbox__control {
      display: inline-grid;
      width: 1em;
      height: 1em;
      border-radius: 0.1em;
      border: 0.1em solid var(--lightViolet);

      svg {
        transition: transform 0.1s ease-in 25ms;
        transform: scale(0);
        transform-origin: bottom left;
      }
    }

    input[type='checkbox'] {
      opacity: 0;
      width: 1em;
      height: 1em;
    }
  }
`;

export default function PlusOneRSVP({ guest, inputs, handleChange }: PlusOneRSVPProps) {
  function onChangePlusOne() {
    handleChange({
      target: {
        value: !inputs[`${guest.id}`].plusOne,
        name: `${guest.id}_plusOne`,
        type: 'text',
      },
    });
  }

  return (
    <PlusOneStyles key={`${guest.id}`}>
      <label htmlFor={`${guest.id}`} className="checkbox">
        <span className="checkbox__input">
          <input
            id={`${guest.id}`}
            name={`${guest.id}`}
            checked={inputs[`${guest.id}`].plusOne}
            onChange={onChangePlusOne}
            type="checkbox"
          />
          <span className="checkbox__control">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </span>
        </span>
        <span className="checkbox__label">Plus one? </span>
      </label>
      {inputs[`${guest.id}`].plusOne && (
        <div className="plusone__names">
          <input
            type="text"
            id={`${guest.id}_plusOneFirstName`}
            name={`${guest.id}_plusOneFirstName`}
            placeholder="First Name"
            value={inputs[`${guest.id}`]?.plusOneFirstName}
            onChange={handleChange}
          />
          <input
            type="text"
            id={`${guest.id}_plusOneLastName`}
            name={`${guest.id}_plusOneLastName`}
            placeholder="Last Name"
            value={inputs[`${guest.id}`]?.plusOneLastName}
            onChange={handleChange}
          />
        </div>
      )}
    </PlusOneStyles>
  );
}
