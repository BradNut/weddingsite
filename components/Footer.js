import styled from 'styled-components';
import Link from 'next/link';
import useUser from '../lib/useUser';

const FooterStyles = styled.footer`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 1rem;
  text-align: center;

  margin-top: 6rem;

  @media (max-width: 800px) {
    margin-top: 2rem;
  }

  h2 {
    font-size: 4rem;
  }

  hr {
    display: block;
    max-width: 50%;
    height: 0;
    max-height: 0;
    border: solid;
    width: 100%;
    border-width: thin 0 0 0;
    transition: inherit;
    border-color: var(--lightShade);
    color: var(--lightShade);
  }

  p {
    margin: 0;
    padding: 0.2rem;
    font-weight: 600;
    color: var(--lightShade);
  }

  ul {
    margin: 0.5rem;
  }
`;

export default function Footer() {
  const { user } = useUser();

  return (
    <FooterStyles>
      <div>
        <h2>
          <Link href="/">N & N</Link>
        </h2>
        {user && user.isLoggedIn === true ? (
          <>
            <hr />
            <h3>06.03.2030</h3>
          </>
        ) : (
          ''
        )}
      </div>
      <div>
        <p>Created by Bradley Shellnut</p>
        <div>
          Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </FooterStyles>
  );
}
