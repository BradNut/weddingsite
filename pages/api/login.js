import bcrypt from 'bcryptjs';
import withSession from '../../lib/session';
import connectDb from '../../utils/db';
import User from '../../models/User';

const { compare } = bcrypt;

export default withSession(async (req, res) => {
  const { username, password, penguin } = await req.body;
  await connectDb();

  try {
    if (username && password && penguin && penguin === 'penguin') {
      let isAuthorized = false;

      // TODO: REMOVE THIS IF GOING TO PRODUCTION
      if (process.env.SITE_ENV === 'TEST_SITE') {
        const user = { isLoggedIn: isAuthorized, id: 'TEST_SITE_ID_123456' };
        req.session.set('user', user);
        await req.session.save();
        res.json(user);
      }

      const userData = await User.findOne({ username });
      const savedPassword = userData?.password || '';
      isAuthorized = await compare(password, savedPassword);
      if (isAuthorized) {
        const user = { isLoggedIn: isAuthorized, id: userData._id };
        req.session.set('user', user);
        await req.session.save();
        res.json(user);
      } else {
        res.status(400).json({ message: 'Unable to login' });
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
