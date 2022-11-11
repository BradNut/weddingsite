import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import { weddingParty } from '../utils/imageData';
import buildBase64Data from '../utils/buildBase64Data';

const PartyPageStyles = styled.div`
  display: grid;
  justify-items: center;
  gap: 1.5rem;

  img,
  figure {
    border-radius: 4px;
  }
`;

const PartyStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const PartyCard = styled.div`
  display: grid;
  h3 {
    margin-top: 1rem;
  }
`;

export default function PartyPage({ mainImage, officiantImage, partyImages }) {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <PartyPageStyles>
      <Head>
        <title key="title">N & N | Wedding Party</title>
      </Head>
      <div
        style={{
          display: 'grid',
        }}
      >
        <h1 className="center">Meet our Wedding Party</h1>
        <Image
          {...mainImage?.imageProps}
          alt={mainImage?.alt}
          placeholder="blur"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <h2 className="center">The Party</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 400px)',
          justifyContent: 'center',
          margin: '1rem 0',
        }}
      >
        <PartyCard className="card">
          <h2 className="center">Officiant</h2>
          <Image
            {...officiantImage?.imageProps}
            alt={officiantImage?.alt}
            placeholder="blur"
          />
          <h3 className="center">Wedding Officiant</h3>
        </PartyCard>
      </div>
      <PartyStyles>
        {partyImages.map((member, index) => (
          <PartyCard className="card" key={index}>
            <h2 className="center">{member.name}</h2>
            <Image {...member.imageProps} alt={member.alt} placeholder="blur" 
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
            <h3 className="center">{member.title}</h3>
          </PartyCard>
        ))}
      </PartyStyles>
    </PartyPageStyles>
  );
}

export async function getStaticProps() {
  const partyImages = [];
  for (const member of weddingParty) {
    const imageData = await buildBase64Data(false, member.url, member.alt, {
      name: member.name,
      title: member.title,
    });
    partyImages.push(imageData);
  }

  const mainImage = await buildBase64Data(
    false,
    'https://picsum.photos/800/450',
    'Wedding Party',
    {}
  );

  const officiantImage = await buildBase64Data(
    false,
    'https://picsum.photos/1200/1600',
    'Wedding Officiant',
    {}
  );

  return {
    props: {
      mainImage,
      officiantImage,
      partyImages,
    },
  };
}
