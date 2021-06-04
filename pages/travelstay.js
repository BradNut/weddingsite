import Head from 'next/head';
import styled from 'styled-components';
import { RiExternalLinkLine } from 'react-icons/ri';
import Layout from '../components/Layout';
import { MapIcon } from '../lib/svgs';
import useUser from '../lib/useUser';

const TravelAndStayStyles = styled.div`
  display: grid;
  gap: 4rem;
  text-align: center;

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-top: 1.5rem;
    }
  }

  a.link {
    text-decoration: underline;
    color: var(--primary);
  }
`;

export default function TravelAndStayPage() {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      <Head>
        <title>Wedding - Travel & Stay</title>
      </Head>
      <TravelAndStayStyles>
        <h1>Travel & Stay</h1>
        <div>
          <h2>Traveling to the wedding</h2>
          <p>
            <a
              target="_blank"
              href="https://share.here.com/p/s-YmI9LTczLjk4MTYxJTJDNDAuNzY0MjclMkMtNzMuOTQ4ODIlMkM0MC44MDA0OTtjPWFkbWluaXN0cmF0aXZlLXJlZ2lvbjtsYXQ9NDAuNzgyMzg7bG9uPS03My45NjUyMTtuPUNlbnRyYWwrUGFyazt6PTE0O2g9MWM3MDIz"
              rel="noopener noreferrer nofollow"
              aria-label="Go to map"
            >
              <MapIcon />
            </a>{' '}
            Central Park
          </p>
          <p>Central Park, New York, NY, USA</p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Example Hotel Website"
              href="https://hotelexample.com/contact/"
            >
              Hotel Website <RiExternalLinkLine />
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://share.here.com/p/s-YmI9LTczLjk4MTYxJTJDNDAuNzY0MjclMkMtNzMuOTQ4ODIlMkM0MC44MDA0OTtjPWFkbWluaXN0cmF0aXZlLXJlZ2lvbjtsYXQ9NDAuNzgyMzg7bG9uPS03My45NjUyMTtuPUNlbnRyYWwrUGFyazt6PTE0O2g9MWM3MDIz"
              rel="noopener noreferrer nofollow"
              aria-label="Go to map"
              className="link"
            >
              Get Directions to the hotel
            </a>
          </p>
        </div>
        <div>
          <h2>Hotel Information</h2>
          <h2>Do I need to book a hotel room?</h2>
          <p>
            Answer
          </p>
          <p>There are also hotels in the area such as:</p>
          <ul>
            <li>
              <a
                href="https://www.hotelexample.com/"
                aria-label="Name of Hotel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Example 1 <RiExternalLinkLine />
              </a>
            </li>
            <p>Travel Time: X minute drive (X miles)</p>
            <li>
              <a
                href="https://www.hotelexample.com/"
                aria-label="Name of Hotel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Example 1 <RiExternalLinkLine />
              </a>
            </li>
            <p>Travel Time: X minute drive (X miles)</p><li>
              <a
                href="https://www.hotelexample.com/"
                aria-label="Name of Hotel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Example 1 <RiExternalLinkLine />
              </a>
            </li>
            <p>Travel Time: X minute drive (X miles)</p>
          </ul>
        </div>
      </TravelAndStayStyles>
    </>
  );
}
