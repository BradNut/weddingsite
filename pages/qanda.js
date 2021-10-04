import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';

const QAStyles = styled.div`
  ol > li {
    margin-top: 2rem;
  }
  a {
    text-decoration: underline;
  }

  li {
    font-weight: bold;
  }
  p {
    color: var(--white);
  }
`;

export default function QandAPage() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <div>
      <Head>
        <title key="title">N & N | QA</title>
      </Head>
      <h1 className="center">Q & A</h1>
      <QAStyles>
        <ol>
          <li>Question 1</li>
          <p>Answer 1</p>
          <li>How do I get to the venue?</li>
          <p>
            See more detailed info on our{' '}
            <Link href="/travelstay">Travel & Stay</Link> page.
          </p>
          <li>I still have questions, what is the best way to contact you?</li>
          <p>
            If you have any questions not answered by this Q&A feel free to
            contact Name and Name at{' '}
            <a href="mailto:name@example.com">name@example.com</a>.
          </p>
        </ol>
      </QAStyles>
    </div>
  );
}
