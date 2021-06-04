import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';

const HomeStyles = styled.div`
  display: grid;
  gap: 2rem;
`;

export default function HomePage() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      <Head>
        <title>N & N - Wedding</title>
      </Head>
      <HomeStyles>
        <h1>Welcome!</h1>
      </HomeStyles>
    </>
  );
}
