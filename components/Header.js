import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useUser from '../lib/useUser';
import WeddingStart from './WeddingStart';
import Nav from './Nav';

const HeaderStyles = styled.header`
  display: grid;
  gap: 1.8rem;
  margin: 2rem 1.5rem 1rem 1.5rem;
  nav {
    margin-top: 1.5rem;
  }

  @media (max-width: 650px) {
    h2 {
      font-size: var(--h3);
    }
  }
`;

const Header = () => {
  const { user, mutateUser } = useUser();
  return (
    <HeaderStyles>
      <div>
        <Link href="/">
          <a>
            <h1 className="center">Name & Name</h1>
          </a>
        </Link>
        {user && user.isLoggedIn === true ? (
          <>
            <h2 className="center">
              June 3rd, 2030 &#8226; New York, New York
            </h2>
            <h3 className="center">
              Countdown: <WeddingStart /> days!
            </h3>
          </>
        ) : (
          ''
        )}
      </div>
      {user && user.isLoggedIn === true ? <Nav /> : ''}
    </HeaderStyles>
  );
};

export default Header;
