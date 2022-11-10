import Head from 'next/head';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SWRConfig } from 'swr';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import fetch from '../lib/fetchJson';
import Script from 'next/script';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Page>
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/assets/images/wedding-ring.png"
          />
          {/* meta tags */}
          <meta charSet="utf-8" />
          <meta name="description" content="Wedding Website" />
          <meta name="theme-color" content="#FCCFB9" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Wedding Website" key="og:title" />
          <meta
            description="og:description"
            content="Wedding Website"
            key="ogdesc"
          />
          <meta
            property="og:site_name"
            content="Wedding Website"
            key="ogsitename"
          />
          <meta property="og:image" content="/assets/images/wedding-ring.png" />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:card" content="summary" />
          {/* <meta name="twitter:url" content="https://" /> */}
          <meta name="twitter:title" content="Wedding Website" />
          <meta name="twitter:description" content="Wedding Website" />
          <meta
            name="twitter:image"
            content="/assets/images/wedding-ring.png"
          />
          <link
            rel="preload"
            href="/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Josefin_Sans/static/JosefinSans-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <Script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_URL}
            data-do-not-track="true"
          />
          <noscript>
            <link rel="stylesheet" href="assets/css/noscript.css" />
          </noscript>
        </Head>
        <noscript>
          <div id="no-script">
            <div id="no-script-box">
              <img
                id="no-script-img"
                src="assets/images/js-logo.png"
                alt="Please enable JavaScript"
              />
              <h1 id="no-script-maintext">
                Please enable JavaScript to view the site.
              </h1>
              <h2 id="no-script-subtext">
                This Web application relies on Javascript to function, please{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enable JavaScript Insructions"
                  href="https://www.enable-javascript.com/"
                >
                  enable
                </a>{' '}
                it. Thank You! 🚀
              </h2>
            </div>
          </div>
        </noscript>
        <Component {...pageProps} />
      </Page>
    </SWRConfig>
  );
}

export default MyApp;
