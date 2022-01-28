import Head from 'next/head';
import Image from 'next/image';
import { RiExternalLinkLine } from 'react-icons/ri';
import styled from 'styled-components';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import buildBase64Data from '../utils/buildBase64Data';
import { photos } from '../utils/imageData';

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

export default function PhotosPage({ images }) {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

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
          {images.map((image) => (
            <Image
              {...image?.imageProps}
              alt={image?.alt}
              width={image.width}
              height={image.height}
              objectFit="cover"
              placeholder="blur"
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

export async function getStaticProps() {
  const images = [];
  for (const photo of photos) {
    const imageData = await buildBase64Data(false, photo.url, photo.alt, {
      width: 1000,
      height: 1000,
    });
    images.push(imageData);
  }

  return {
    props: {
      images,
    },
  };
}
