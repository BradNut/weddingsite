import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Form from '../../components/styles/Form';
import fetchJson from '../../lib/fetchJson';
import useForm from '../../lib/useForm';
import useUser from '../../lib/useUser';

const RSVPStyles = styled.div`
  display: grid;
`;

const ErrorContactStyles = styled.p`
  font-weight: bold;
  a {
    text-decoration: underline;
  }
`;

export default function RsvpPage() {
  const router = useRouter();

  const { inputs, handleChange } = useForm({
    firstName: '',
    lastName: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  async function handleSubmit(firstName, lastName) {
    const body = {
      firstName,
      lastName,
    };

    try {
      const res = await fetchJson('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 'SUCCESS') {
        router.push({
          pathname: `/rsvp/${res.groupId}`,
        });
      } else {
        setErrorCount(errorCount + 1);
        setErrorMsg('Unable to RSVP');
      }
    } catch (error) {
      // console.error('An unexpected error happened:', error);
      setErrorCount(errorCount + 1);
      setErrorMsg('Unable to RSVP');
    }
  }

  return (
    <RSVPStyles>
      <Head>
        <title key="title">N & N | RSVP</title>
      </Head>
      <h1 className="center">RSVP to our wedding</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await handleSubmit(inputs.firstName, inputs.lastName);
          setLoading(false);
        }}
      >
        {errorMsg && <p className="error">Error: {errorMsg}</p>}
        {errorMsg && errorCount > 3 && (
          <ErrorContactStyles>
            Support contact:{' '}
            <a
              href={`mailto:name@example.com?subject=RSVP Failed for ${inputs.firstName} ${inputs.lastName}`}
            >
              name@example.com
            </a>
          </ErrorContactStyles>
        )}
        <fieldset aria-busy={loading} disabled={loading}>
          <label htmlFor="firstName">
            <span>First Name</span>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={inputs.firstName}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="lastName">
            <span>Last Name</span>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Click to RSVP</button>
        </fieldset>
      </Form>
    </RSVPStyles>
  );
}
