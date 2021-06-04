import styled from 'styled-components';
import Head from 'next/head';
import useUser from '../lib/useUser';
import HomeContent from '../components/HomeContent';
import connectDb from '../utils/db';
import Login from '../components/Login';
import Layout from '../components/Layout';

const LandingStyles = styled.div`
  display: grid;
`;

export default function Home() {
  const { user, mutateUser } = useUser();

  if (!user) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <LandingStyles>
      <Head>
        <title key="title">N & N | Wedding</title>
      </Head>
      {user && user.isLoggedIn === true ? <HomeContent /> : <Login />}
    </LandingStyles>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
