import bcrypt from 'bcryptjs';
import escape from 'escape-html';
import withSession from '../../lib/session';
import connectDb from '../../utils/db';
import User from '../../models/User';

const { compare } = bcrypt;

export default withSession(async (req, res) => {
  const { username, password, penguin } = await req.body;
  // TODO: REMOVE THIS IF GOING TO PRODUCTION
  // In production just await connectDB()
  if (process.env.SITE_ENV !== 'TEST_SITE') {
    await connectDb();
  }

  try {
    if (username && password && penguin && escape(penguin) === 'penguin') {
      let isAuthorized = false;

      // TODO: REMOVE THIS IF GOING TO PRODUCTION
      if (process.env.SITE_ENV === 'TEST_SITE') {
        const user = { isLoggedIn: true, id: 'TEST_SITE_ID_123456' };
        req.session.user = user;
        await req.session.save();
        res.json(user);
      } else {
        const userData = await User.findOne({ username: escape(username) });
        const savedPassword = userData?.password || '';
        isAuthorized = await compare(password, savedPassword);
        if (isAuthorized) {
          const user = { isLoggedIn: isAuthorized, id: userData._id };
          req.session.user = user;
          await req.session.save();
          res.json(user);
        } else {
          res.status(400).json({ message: 'Unable to login' });
        }
      }
    } else {
      res.status(400).json({ message: 'Unable to login' });
    }
  } catch (error) {
    console.error(error);
    const { response: fetchResponse } = error;
    res
      .status(fetchResponse?.status || 500)
      .json({ message: 'Unable to login' });
  }
});
