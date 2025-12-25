import Head from 'next/head';

export default function FourOhFourPage() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <h1>Sorry page not found!</h1>
      <p>404.</p>
      <p>You just hit a route that doesn't exist.</p>
    </>
  );
}
