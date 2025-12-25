import { getSession } from '../../lib/session';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const { user } = session;

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}
