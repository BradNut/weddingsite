// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { getIronSession } from 'iron-session';

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'weddingwebsitesession',
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    // maxAge default is 14 days
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession(req, res) {
  return getIronSession(req, res, sessionOptions);
}
