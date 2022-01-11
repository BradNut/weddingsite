import Head from 'next/head';
import { RiExternalLinkLine } from 'react-icons/ri';
import styled from 'styled-components';
import CustomNextImage from '../components/CustomNextImage';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';

export const PhotoPageStyles = styled.div`
  display: grid;
  gap: 1.5rem;

  a {
    text-decoration: underline;
  }
`;

export const PhotosStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  margin: 0.5rem auto;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, minmax(150px, 2000px));
    grid-gap: 1.2rem;
    margin: 0.2rem 0;
    justify-content: center;
  }

  img,
  figure {
    border-radius: 4px;
    box-shadow: var(--level-1);
  }
`;

export default function PhotosPage() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const photos = [
    {
      url: 'https://picsum.photos/1000/1000',
      alt: 'Photo 1',
    },
    {
      url: 'https://picsum.photos/1000/1002',
      alt: 'Photo 2',
    },
    {
      url: 'https://picsum.photos/1000/1003',
      alt: 'Photo 3',
    },
    {
      url: 'https://picsum.photos/1000/1004',
      alt: 'Photo 4',
    },
    {
      url: 'https://picsum.photos/1000/1005',
      alt: 'Photo 5',
    },
    {
      url: 'https://picsum.photos/1000/1006',
      alt: 'Photo 6',
    },
  ];

  return (
    <div>
      <Head>
        <title key="title">N & N | Photos</title>
      </Head>
      <PhotoPageStyles className="center">
        <h1>Photos</h1>
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Link to Photo Gallery"
          href="https://example.com"
        >
          Link to full photo gallery <RiExternalLinkLine />
        </a>
        <PhotosStyles>
          {photos.map((photo) => (
            <CustomNextImage
              key={photo.alt}
              src={photo.url}
              alt={photo.alt}
              height={1000}
              width={1000}
            />
          ))}
        </PhotosStyles>
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Link to Photo Gallery"
          href="https://example.com"
        >
          Link to full photo gallery <RiExternalLinkLine />
        </a>
      </PhotoPageStyles>
    </div>
  );
}
