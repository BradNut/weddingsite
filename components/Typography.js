import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  @font-face {
    font-family: 'Josefin_Sans';
    src: url('/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    display: swap;
  }

  @font-face {
    font-family: 'Josefin_Sans_Bold';
    src: url('/fonts/Josefin_Sans/static/JosefinSans-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    display: swap;
  }

  html {
    font-family: 'Josefin_Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* TODO: Change to theme value of light or dark */
    color: var(--lightGrey);
  }

  p, li {
    letter-spacing: 0.5px;
    font-size: 1.5rem;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Josefin_Sans_Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* TODO: Change to theme value of light or dark */
    color: var(--primary);
    font-weight: normal;
    margin: 0;
  }

  h1 {
    margin-top: 0;
    font-size: var(--h1);
  }

  h2 {
    font-size: var(--h2);
  }

  h3 {
    font-size: var(--h3);
  }

  h4 {
    font-size: var(--h4);
  }

  h5 {
    font-size: var(--h5);
  }

  body {
    font-family: 'Josefin_Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    color: var(--lightGrey);
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
