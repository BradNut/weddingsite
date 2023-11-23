import withSession from '../../lib/session';
import Guest from '../../models/Guest';
import connectDb from '../../utils/db';

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
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
});
