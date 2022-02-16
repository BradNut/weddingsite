import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import fetchJson from '../lib/fetchJson';
import useUser from '../lib/useUser';

async function logout(router) {
  try {
    fetchJson('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }).then((e) => {
      router.push({
        pathname: `/`,
      });
    });
  } catch (e) {
    console.error(e);
  }
}

export default function LogoutPage() {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <button type="button" onClick={() => logout(router)}>
      LOGOUT
    </button>
  );
}
