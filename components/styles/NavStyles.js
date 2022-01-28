import styled from 'styled-components';

const NavStyles = styled.nav`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2rem;
  gap: 1.5rem;

  a,
  button {
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.8rem;
    background: none;
    border: 0;
    cursor: pointer;

    @media (max-width: 700px) {
      font-size: 1.5rem;
      padding: 0 10px;
    }
  }
  @media (max-width: 1300px) {
    // border-top: 1px solid var(--lightGray);
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
