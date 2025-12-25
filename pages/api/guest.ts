import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/session';
import Guest from '../../models/Guest';
import connectDb from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const {
    query: { id },
    method,
  } = req;

  const { user } = session;

  if (!user?.isLoggedIn) {
    res.status(401).end();
    return;
  }

  await connectDb();

  switch (method) {
    case 'GET':
      try {
        const guest = await Guest.findById(id);
        if (!guest) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: guest });
      } catch (error) {
        const err = error as { response?: { status?: number }; data?: unknown };
        res.status(err.response?.status || 500).json(err.data);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
