import Head from 'next/head';
import CustomNextImage from '../components/CustomNextImage';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';
import { PhotoPageStyles } from './photos';

export default function StoryPage() {
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
        <CustomNextImage
          src="https://via.placeholder.com/450X800.png"
          alt="Placeholder Our Story Image"
          height={450}
          width={800}
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
