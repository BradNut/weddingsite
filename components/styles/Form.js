import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
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
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
