import Head from 'next/head';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import GuestRSVP from '../../components/GuestRSVP';
import Layout from '../../components/Layout';
import useForm from '../../lib/useForm';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import Group from '../../models/Group';
import Guest from '../../models/Guest';
import connectDb from '../../utils/db';
import { CalendarIcon, MapIcon } from '../../lib/svgs';
import Modal from '../../components/Modal';

const RSVPGroupStyles = styled.div`
  h2 {
    margin: 2rem 0;
  }
`;

const loadingFrame = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const FormStyles = styled.form`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  &::before,
  &::after {
    height: 10px;
    content: '';
    display: block;
    border-radius: 4px;
    background-image: linear-gradient(
      to right,
      var(--primary) 0%,
      var(--lightViolet) 50%,
      var(--primary) 100%
    );
  }
  &[aria-busy='true']::before,
  &[aria-busy='true']::after {
    background-size: 50% auto;
    animation: ${loadingFrame} 0.5s linear infinite;
  }

  label {
    display: grid;
    gap: 1rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--primary);
    &:focus {
      outline: 0;
      border-color: var(--lightViolet);
    }
  }

  button[type='submit'],
  input[type='submit'] {
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    padding: 1.2rem 1.2rem;
  }

  hr {
    display: block;
    max-width: 100%;
    height: 0;
    max-height: 0;
    border: solid;
    width: 100%;
    border-width: thin 0 0 0;
    transition: inherit;
    border-color: var(--lightShade);
    color: var(--lightShade);
    margin: 2.5rem 0;
  }

  button:disabled {
    background: var(--lightGray);
  }

  fieldset {
    border-radius: 4px;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

const AddressStyles = styled.div`
  button {
    background: none;
    color: var(--primary);
    padding: 0;
  }
`;

const QuestionStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;

const ErrorContactStyles = styled.p`
  font-weight: bold;
  a {
    text-decoration: underline;
  }
`;

const ModalContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  text-align: center;
`;

export default function SingleGroupPage({ group }) {
  const { guests, note } = group;
  const { user } = useUser({ redirectTo: '/login' });
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupHasPlusOne, setGroupHasPlusOne] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const address = 'Central Park, New York, New York, USA';

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function getInitialFormData() {
    const initial = {};
    for (const guest of guests) {
      const guestData = {
        rsvpStatus: guest?.rsvpStatus || '',
        dietaryNotes: guest?.dietaryNotes || '',
        songRequests: guest?.songRequests || '',
        hasPlusOne: guest?.hasPlusOne || false,
        plusOne: guest?.plusOne || false,
        plusOneFirstName: guest?.plusOneFirstName || '',
        plusOneLastName: guest?.plusOneLastName || '',
      };
      initial[guest.id] = guestData;
      if (guest.hasPlusOne) {
        setGroupHasPlusOne(true);
      }
    }
    initial.note = note || '';
    return initial;
  }

  const { inputs, handleChange, clearForm, resetForm } =
    useForm(getInitialFormData);

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  if (group?.guests?.length === 0) return <p>Loading...</p>;

  async function handleSubmit(groupId) {
    const keys = Object.keys(inputs);
    const guestData = [];
    // console.log(JSON.stringify(inputs));
    keys.forEach((key, index) => {
      if (key !== 'note') {
        guestData.push({
          id: key,
          ...inputs[key],
        });
      }
    });

    const body = {
      groupId,
      note: inputs.note,
      guests: guestData,
    };

    try {
      const res = await fetchJson('/api/group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.message === 'SUCCESS') {
        setMessage(
          `Successfully submited your RSVP${
            body.guests.length > 1 ? 's' : ''
          }. Don't forget to save the date!!`
        );
        openModal();
      } else {
        setErrorCount(errorCount + 1);
        setErrorMsg('Unable to RSVP Your Group');
      }
    } catch (error) {
      // console.error('An unexpected error happened:', error);
      setErrorCount(errorCount + 1);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <div>
      <Head>
        <title key="title">N & N | RSVP</title>
      </Head>
      <RSVPGroupStyles>
        <h2>Wedding SAYING I DO</h2>
        <div>
          <a href="/myevents.ics" aria-label="Add to calendar">
            <CalendarIcon />
          </a>{' '}
          Monday, June 3rd, 2030 at 5:00 PM
        </div>
        <AddressStyles>
          <p>
            <a
              target="_blank"
              href="https://share.here.com/p/s-YmI9LTczLjk4MTYxJTJDNDAuNzY0MjclMkMtNzMuOTQ4ODIlMkM0MC44MDA0OTtjPWFkbWluaXN0cmF0aXZlLXJlZ2lvbjtsYXQ9NDAuNzgyMzg7bG9uPS03My45NjUyMTtuPUNlbnRyYWwrUGFyazt6PTE0O2g9MWM3MDIz"
              rel="noopener noreferrer nofollow"
              aria-label="Go to map"
            >
              <MapIcon />
            </a>{' '}
            Wedding Location
          </p>
          <p>{address}</p>
        </AddressStyles>
      </RSVPGroupStyles>
      <FormStyles
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await handleSubmit(group.id);
          setLoading(false);
        }}
        aria-busy={loading}
        disabled={loading}
      >
        {errorMsg && <p className="error">Error: {errorMsg}</p>}
        {errorMsg && errorCount > 3 && (
          <ErrorContactStyles>
            Support contact:{' '}
            <a
              href={`mailto:name@example.com?subject=RSVP Group Failed: ${errorMsg} ${group.id}`}
            >
              name@example.com
            </a>
          </ErrorContactStyles>
        )}
        <fieldset aria-busy={loading} disabled={loading}>
          <legend>RSVP Invitation</legend>
          {group.guests.map((guest) => (
            <GuestRSVP
              key={guest.id}
              guest={guest}
              inputs={inputs}
              handleChange={handleChange}
            />
          ))}
        </fieldset>
        <fieldset aria-busy={loading} disabled={loading}>
          <legend>
            Do you {groupHasPlusOne ? 'or your plus one ' : ''}have any dietary
            restrictions?
          </legend>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            {group?.guests?.map((guest) =>
              !guest.isPlusOne ? (
                <QuestionStyles key={`${guest?.id}-dietaryNotes`}>
                  <p>
                    {guest.firstName} {guest.lastName} :
                  </p>
                  <label htmlFor={`${guest.id}-dietaryNotes`}>
                    <textarea
                      name={`${guest.id}-dietaryNotes`}
                      id={`${guest.id}-dietaryNotes`}
                      cols="30"
                      rows="2"
                      placeholder="Example: Nut allergy, Fish, etc."
                      value={inputs[guest.id]?.dietaryNotes}
                      onChange={handleChange}
                    />
                  </label>
                </QuestionStyles>
              ) : (
                ''
              )
            )}
          </div>
        </fieldset>
        <fieldset aria-busy={loading} disabled={loading}>
          <legend>Do you have any song requests?</legend>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            {group?.guests?.map((guest) =>
              !guest?.isPlusOne ? (
                <QuestionStyles key={`${guest?.id}-songRequests`}>
                  <p>
                    {guest.firstName} {guest.lastName}:
                  </p>
                  <label htmlFor={`${guest.id}-songRequests`}>
                    <textarea
                      name={`${guest.id}-songRequests`}
                      id={`${guest.id}-songRequests`}
                      cols="30"
                      rows="2"
                      placeholder="Example: Paint It Black - Rolling Stones"
                      value={inputs[guest.id]?.songRequests}
                      onChange={handleChange}
                    />
                  </label>
                </QuestionStyles>
              ) : (
                ''
              )
            )}
          </div>
        </fieldset>
        <fieldset aria-busy={loading} disabled={loading}>
          <legend>Additonal Notes?</legend>
          <textarea
            name="note"
            id="note"
            cols="30"
            rows="10"
            value={inputs.note}
            onChange={handleChange}
            placeholder="Anything you want to ask us?"
          />
        </fieldset>
        <hr />
        {errorMsg && <p className="error">Error: {errorMsg}</p>}
        {errorMsg && errorCount > 3 && (
          <ErrorContactStyles>
            Support contact:{' '}
            <a
              href={`mailto:name@example.com?subject=RSVP Group Failed: ${errorMsg}`}
            >
              name@example.com
            </a>
          </ErrorContactStyles>
        )}
        <button type="submit">Submit RSVP</button>
      </FormStyles>
      <Modal
        isOpen={showModal}
        onHide={closeModal}
        contentLabel="RSVP Success"
        headerCaption={<h2>RSVP Success</h2>}
      >
        <ModalContentStyles>
          <p>{message}</p>
          <div>
            <p>Saturday, June 25, 2022 at 5:00 PM</p>
            <a href="/ibwedding.ics" aria-label="Click to add to calendar">
              <CalendarIcon /> Add to Calendar
            </a>
          </div>
        </ModalContentStyles>
      </Modal>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const group = {};

    // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
    if (process.env.SITE_ENV === 'TEST_SITE') {
      group.id = params.id;
      group.guests = [
        {
          id: 'TEST_GUEST_ID_12345',
          firstName: 'Test',
          lastName: 'Lastname',
          rsvpStatus: false,
          dietaryNotes: '',
          songRequests: '',
          hasPlusOne: true,
          plusOne: false,
          plusOneFirstName: '',
          plusOneLastName: '',
        },
      ];
      group.note = '';
      return { props: { group } };
    }

    await connectDb();
    const groupData = await Group.findById(params.id);

    group.id = params.id;
    const guestList = [];
    for (const guestId of groupData?.guests) {
      const guestData = await Guest.findById(guestId);
      const guest = {
        id: guestData.id,
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        rsvpStatus: guestData.rsvpStatus || '',
        dietaryNotes: guestData.dietaryNotes || '',
        songRequests: guestData.songRequests || '',
        hasPlusOne: guestData.hasPlusOne || false,
        plusOne: guestData.plusOne || false,
        plusOneFirstName: guestData.plusOneFirstName || '',
        plusOneLastName: guestData.plusOneLastName || '',
      };
      guestList.push(guest);
    }
    group.guests = guestList;
    group.note = groupData.note || '';

    return { props: { group } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
