// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSessionApiRoute } from 'iron-session/next';

export default function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'weddingwebsitesession',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      // maxAge default is 14 days
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
