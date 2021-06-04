import Head from 'next/head';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SWRConfig } from 'swr';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import fetch from '../lib/fetchJson';

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
          <link rel="icon" type="image/svg" href="/penguin.svg" />
          {/* meta tags */}
          <meta charSet="utf-8" />
          <meta name="description" content="Wedding Website" />
          <meta name="theme-color" content="#FCCFB9" />
          <meta name="robots" content="noindex" />
          <meta name="googlebot" content="noindex" />
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
        </Head>
        <Component {...pageProps} />
      </Page>
    </SWRConfig>
  );
}

export default MyApp;
