import escape from 'escape-html';
import withSession from '../../lib/session';
import connectDb from '../../utils/db.js';
import Guest from '../../models/Guest';

export default withSession(async (req, res) => {
  const {
    query: { id },
    method,
    session,
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
        firstName: { $regex: new RegExp(escape(firstName.trim()), 'i') },
        lastName: { $regex: new RegExp(escape(lastName.trim()), 'i') },
      });
      // console.log(JSON.stringify(result));
      res.status(200).json({ status: 'SUCCESS', groupId: result.group });
    } catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json({ status: 'FAILURE' });
    }
  }
});
