import Head from 'next/head';
import { RiExternalLinkLine } from 'react-icons/ri';
import CustomNextImage from '../components/CustomNextImage';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import { PhotoPageStyles, PhotosStyles } from './photos';

export default function CatsPage() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const cats = [
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 1',
    },
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 2',
    },
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 3',
    },
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 4',
    },
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 5',
    },
    {
      url: 'https://via.placeholder.com/500x500.png',
      alt: 'Cat 6',
    },
  ];

  return (
    <div>
      <Head>
        <title key="title">N & N | Our Cats</title>
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
          {cats.map((cat) => (
            <CustomNextImage
              key={cat.url}
              src={cat.url}
              alt={cat.alt}
              height={500}
              width={500}
              blur
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
