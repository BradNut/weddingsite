import { getSession } from '../../lib/session';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  session.destroy();
  res.json({ isLoggedIn: false });
}
