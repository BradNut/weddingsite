import { ImageProps } from 'next/image';
import styled from 'styled-components';
import Head from 'next/head';
import useUser from '../lib/useUser';
import HomeContent from '../components/HomeContent';
import Login from '../components/Login';
import Layout from '../components/Layout';
import buildBase64Data from '../utils/buildBase64Data';

interface HomeProps {
  alt: string;
  imageProps: ImageProps;
}

const LandingStyles = styled.div`
  display: grid;
`;

export default function Home({ alt, imageProps }: HomeProps) {
  const { user } = useUser();

  if (!user) {
    return (
      <Layout>
        <LandingStyles>
          <h1>Loading...</h1>
        </LandingStyles>
      </Layout>
    );
  }

  return (
    <LandingStyles>
      <Head>
        <title key="title">N & N | Wedding</title>
      </Head>
      {user && user.isLoggedIn === true ? (
        <HomeContent alt={alt} imageProps={imageProps} />
      ) : (
        <Login />
      )}
    </LandingStyles>
  );
}

export async function getStaticProps() {
  const src = 'https://picsum.photos/1307/880';
  const data = await buildBase64Data(false, src, 'Picture of the couple');

  return {
    props: { ...data },
  };
}
