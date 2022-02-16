import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';

const FormStyles = styled.form`
  display: grid;

  label {
    display: grid;
    gap: 1rem;
  }

  button {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export default function RegisterPage() {
  const router = useRouter();

  const { inputs, handleChange } = useForm({
    username: '',
    password: '',
  });

  useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(username, password) {
    const body = {
      username,
      password,
    };

    try {
      const res = await fetchJson('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(res);
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(inputs.username, inputs.password);
        if (!errorMsg && errorMsg?.length !== 0) {
          router.push({
            pathname: `/`,
          });
        } else {
          console.log(errorMsg);
        }
      }}
    >
      {errorMsg && <p className="error">Error: {errorMsg}</p>}
      <fieldset aria-busy={false} disabled={false}>
        <label htmlFor="username">
          <span>Username</span>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={inputs.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </fieldset>
    </FormStyles>
  );
}
