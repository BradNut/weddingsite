import escapeHtml from 'escape-html';
import { getSession } from '../../lib/session';
import connectDb from '../../utils/db.js';
import Guest from '../../models/Guest';

export default async function handler(req, res) {
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

  // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
  if (process.env.SITE_ENV === 'TEST_SITE') {
    res.status(200).json({ status: 'SUCCESS', groupId: 'TESTID-12345' });
  } else {
    await connectDb();
    const { firstName, lastName } = await req.body;

    try {
      const result = await Guest.findOne({
        firstName: { $regex: new RegExp(escapeHtml(firstName.trim()), 'i') },
        lastName: { $regex: new RegExp(escapeHtml(lastName.trim()), 'i') },
      });
      // console.log(JSON.stringify(result));
      res.status(200).json({ status: 'SUCCESS', groupId: result.group });
    } catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json({ status: 'FAILURE' });
    }
  }
}
