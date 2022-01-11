import { genSalt, hash } from 'bcryptjs';
import withSession from '../../lib/session';
import connectDb from '../../utils/db.js';
import User from '../../models/User';

export default withSession(async (req, res) => {
  const { username, password } = await req.body;
  await connectDb();

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  try {
    const result = await User.create({
      username,
      password: hashedPassword,
      role: 'guest',
    });
    const user = { isLoggedIn: true, id: result?._id };
    req.session.user = user;
    await req.session.save();
    res.status(201).json({ success: true });
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
