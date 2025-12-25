import Head from 'next/head';
import Image, { ImageProps } from 'next/image';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import buildBase64Data from '../utils/buildBase64Data';
import { PhotoPageStyles } from './photos';

interface StoryPageProps {
  alt: string;
  imageProps: ImageProps;
}

export default function StoryPage({ alt, imageProps }: StoryPageProps) {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <div>
      <Head>
        <title key="title">N & N | Our Story</title>
      </Head>
      <PhotoPageStyles className="center">
        <h1>Our Story</h1>
        <Image
          {...imageProps}
          alt={alt}
          placeholder="blur"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <p>
          Our story Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Natus, illo. Vitae rerum officia, commodi atque reprehenderit tempore
          amet accusantium dicta corrupti sint vero laboriosam quae explicabo,
          repellat quisquam. Vitae, cumque.
        </p>
      </PhotoPageStyles>
    </div>
  );
}

export async function getStaticProps() {
  const src = 'https://picsum.photos/800/450';
  const data = await buildBase64Data(false, src, 'Picture of us');

  return {
    props: { ...data },
  };
}
