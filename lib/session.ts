// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { getIronSession, SessionOptions, IronSession } from 'iron-session';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface SessionData {
  user?: {
    isLoggedIn: boolean;
    id: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'weddingwebsitesession',
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    // maxAge default is 14 days
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession(req: NextApiRequest, res: NextApiResponse): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(req, res, sessionOptions);
}
