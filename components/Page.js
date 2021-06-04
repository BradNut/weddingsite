import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import Header from './Header';
import Typography from './Typography';
import Footer from './Footer';
import LayoutStyles from './styles/LayoutStyles';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Define Colors as colors */
    --red: #990000;
    --coral: #e64c44;
    --blue: #336699;
    --seaFoamBlue: #466b72;
    --purpleBlue: #2E2B5E;
    --white: #fffffe;
    --greyWhite: #E6E3E0;
    --grey: #efefef;
    --yellow: #ffc600;
    --light: #ffffff;
    --black: #1B2D45;
    --dark: #000000;
    --seaGreen: #83C6A4;
    --lighterDark: #131415;
    --shellYellow: #ffc850;
    --lightGrey: #C5C5C5;
    --lightGray: var(--lightGrey);
    --lightShade: #f8f7f5;
    --darkGrey: #272727;
    --coralTan: #ffddb7;
    // --coralTan: #fccfb9;
    // --coralTan: #ffddb7;
    // --darkTan: #dfb28e;
    --blueGreen: #1d384e;
    --lightViolet: #C298F7;
    --darkerViolet: #7551a9;

    /* Define Colors intentions */
    --primary: var(--coralTan);
    --secondary: var(--coralTan);
    --danger: var(--grey);
    --background: var(--seaFoamBlue);
    --textColor: var(--black);
    --buttonTextColor: var(--black);
    --textAccent: var(--purpleBlue);
    --lineColor: var(--grey);
    --cardBg: var(--darkGrey);
    --headerBackground: var(--darkGrey);
    --footerBackground: var(--darkGrey);
    --linkHover: var(--lightViolet);
    --lightHairLine: var(--lightGrey);
    
    /* Styles */
    --line: solid 1px var(--lineColor);

    /* Type */
    --headingFont: 'Istok Web';
    --bodyFont: 'Kanit';
    --baseFontSize: 100%;
    --h1: 4.209rem;
    --h2: 3.157rem;
    --h3: 2.369rem;
    --h4: 1.777rem;
    --h5: 1.333em;
    --h6: 1rem;
    --bodyTextSize: 1.777rem;
    --smallText: 1.333rem;
    --lineHeight: 1.75;

    /* Elevation */
    --level-0: none;
    --level-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --level-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --level-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --level-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --level-1-primary: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0  rgba(0, 0, 0, 0.06);
    --level-2-primary: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px #C298F7;
    --level-3-primary: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px #C298F7;
    --level-4-primary: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px #C298F7;

    /* Positioning */
    --containerPadding: 2.5%;
    --headerHeight: 8rem;
    --borderRadius: 10px;
    --maxWidth: 850px;

    /* Media Queryies - Not yet supported in CSS */
    /* 
      --xsmall: 340px;
      --small: 500px;
      --large: 960px;
      --wide: 1200px;
    */
  }

  html {
    width: 100%;
    background-image: url('https://res.cloudinary.com/royvalentinedev/image/upload/v1621792514/wedding/Background_u0cgyd.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--seaFoamBlue);
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    line-height: var(--lineHeight);
    color: var(--primary);
    padding: 0;
    margin: 0;
    font-size: var(--bodyTextSize);
  }

  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--primary) var(--background);
  }
  body::-webkit-scrollbar-track {
    background: var(--background);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--primary) ;
    border-radius: 6px;
    border: 3px solid var(--background);
  }

  ::selection {
    background: var(--primary);
    color: var(--background);
  }

  a.button,
  button {
    background: var(--lightViolet);
    color: var(--black);
    border: 0;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--level-1-primary);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      /* --cast: 4px; */
      box-shadow: var(--level-2-primary)
    }
    &:active {
      /* --cast: 2px; */
      box-shadow: var(--level-0)
    }
  }

  a.button.ghost,
  button.ghost {
    background: none;
    color: var(--lightViolet);
    border: 1px solid var(--lightViolet);

    &:disabled {
      color: hsla(266, 86%, 78%, 0.53);
      border: 1px solid hsla(266, 86%, 78%, 0.53);
    }
  }

  a {
    text-decoration: none;
    color: var(--primary);
  }

  a:hover {
    color: var(--linkHover);
    // text-decoration: underline;
  }

  input,textarea {
    font-size: 2rem;
    padding: 0.4rem;
    border-radius: 4px;
    border: 1px solid var(--primary);
    background: inherit;
    color: var(--primary);
  }

  textarea {
    resize: vertical;
  }

  hr {
    border: 0;
    height: 1px;
  }

  nav {
    a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.3rem;
      bottom: -0.4rem;
      left: 0px;
      background: var(--secondary);
      transition: transform 0.3s ease 0s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      transform: scale(0);
    }

    @media (max-width: 650px) {
      a { 
        margin-bottom: 2rem;
      }
    }

    a {
      position: relative;
      font-size: 2rem;
      text-decoration: none;
      margin: 0.4rem 0;

      &[aria-current='page'],
      &.current-parent {
        &:after {
          transform: scale(1);
        }
      }

      &:hover {
        color: var(--secondary);
        &:after {
          transform: scale(1);
        }
      }
    }
  }

  img {
    max-width: 100%;
  }

  img,
  figure {
    border-radius: 4px;
    box-shadow: var(--level-2);
  }

  .emoji:hover {
    cursor: pointer;
  }

  .card {
    padding: 1.5rem;
    background: var(--cardBg);
    box-shadow: var(--level-3);
    border-radius: var(--borderRadius);
  }

  /* First item will never have margin top */
  .card > *:first-child {
    margin-top: 0;
  }

  /* Last item will never have margin bottom */
  .card > *:last-child {
    margin-bottom: 0;
  }

  .modal {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
  }

  .toast {
    color: white;
    background: var(--black);
    border-radius: var(--borderRadius);
    padding: 20px;
    box-shadow: var(--level-2);
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .toast p {
    text-align: center;
    margin: 0;
    max-width: 100%;
  }
`;

const ContentStyles = styled.main`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;

  p {
    margin: 0 auto;
  }
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Typography />
      <LayoutStyles>
        <Header />
        <ContentStyles>{children}</ContentStyles>
        <Footer />
      </LayoutStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
