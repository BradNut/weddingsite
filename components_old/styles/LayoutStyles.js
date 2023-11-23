import styled from 'styled-components';

const LayoutStyles = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  p,
  li {
    word-wrap: normal;
    font-size: var(--bodyTextSize);
    color: var(--primary);
  }
`;

export default LayoutStyles;
