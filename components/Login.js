import { useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import useForm from '../lib/useForm';

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

  box-shadow: var(--level-2);
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid var(--primary);
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    margin-top: 1.5rem;
    display: block;
    margin-bottom: 1rem;
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
  button,
  input[type='submit'] {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    border-radius: 4px;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
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
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loadingFrame} 0.5s linear infinite;
    }
  }

  .penguin {
    display: none;
  }
`;

const Login = () => {
  const router = useRouter();

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    username: 'weddinguser',
    password: '',
    penguin: 'penguin',
  });

  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ username, password, penguin }) {
    const body = {
      username,
      password,
      penguin,
    };

    try {
      const res = await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMsg('Unable to login');
    }
    setLoading(false);
  }

  return (
    <div>
      {/* <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} /> */}
      <FormStyles
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await handleSubmit(inputs);
          if (!errorMsg && errorMsg?.length !== 0) {
            router.push({
              pathname: `/rsvp`,
            });
          }
        }}
      >
        {errorMsg && <p className="error">Error: {errorMsg}</p>}
        <fieldset aria-busy={loading} disabled={loading}>
          <span>Temp password is "weddingsite". PLEASE CHANGE FOR YOUR PRODUCTION SITE!</span>
          <label htmlFor="username">
            <span>Username</span>
            <input
              required
              type="text"
              id="username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            <span>Please enter the password to view this page</span>
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
          <input
            type="penguin"
            name="penguin"
            value={inputs.penguin}
            onChange={handleChange}
            className="penguin"
          />
          <button type="submit">Login</button>
        </fieldset>
      </FormStyles>
    </div>
  );
};

export default Login;
