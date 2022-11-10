import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useUser from '../lib/useUser';
import WeddingStart from './WeddingStart';
import Nav from './Nav';
import useWeddingStart from '../lib/useWeddingStart';

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
  const { user } = useUser();
  const { timeAsDays, pastWeddingDate } = useWeddingStart({
    update: 60000,
  });

  return (
    <HeaderStyles>
      <div>
        <Link href="/">
          <h1 className="center">Name & Name</h1>
        </Link>
        {user && user.isLoggedIn === true && !pastWeddingDate ? (
          <>
            <h2 className="center">June 3rd, 2030 @ New York, New York</h2>
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
