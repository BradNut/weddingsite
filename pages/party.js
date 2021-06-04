import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import CustomNextImage from '../components/CustomNextImage';

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

const weddingParty = [
  {
    name: 'Best Man',
    title: 'Best Man',
    imageUrl: '',
  },
  {
    name: 'Man/Maid of Honor',
    title: 'Man/Maid of Honor',
    imageUrl: '',
  },
  {
    name: 'Groomsman',
    title: 'Groomsman',
    imageUrl: '',
  },
  {
    name: 'Bridesmaid',
    title: 'Bridesmaid',
    imageUrl: '',
  },
  {
    name: 'Groomsman',
    title: 'Groomsman',
    imageUrl: '',
  },
  {
    name: 'Bridesmaid',
    title: 'Bridesmaid',
    imageUrl: '',
  },
  {
    name: 'Groomsman',
    title: 'Groomsman',
    imageUrl: '',
  },
  {
    name: 'Bridesmaid',
    title: 'Bridesmaid',
    imageUrl: '',
  },
];

export default function PartyPage() {
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
        <CustomNextImage
          src="https://via.placeholder.com/450X800.png"
          alt="Wedding Party"
          height={450}
          width={800}
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
          <CustomNextImage
            src="https://via.placeholder.com/1200x1600.png"
            alt="Wedding Officiant"
            objectFit="cover"
            width="1200"
            height="1600"
          />
          <h3 className="center">Wedding Officiant</h3>
        </PartyCard>
      </div>
      <PartyStyles>
        {weddingParty.map((party, index) => (
          <PartyCard className="card" key={index}>
            <h2 className="center">{party.name}</h2>
              <CustomNextImage
                src="https://via.placeholder.com/1200x1600.png"
                alt={`${party.name} - ${party.title}`}
                objectFit="cover"
                width="1200"
                height="1600"
              />
            <h3 className="center">{party.title}</h3>
          </PartyCard>
        ))}
      </PartyStyles>
    </PartyPageStyles>
  );
}
