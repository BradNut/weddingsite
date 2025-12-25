import type { NextApiRequest, NextApiResponse } from 'next';
import { genSalt, hash } from 'bcryptjs';
import { getSession } from '../../lib/session';
import connectDb from '../../utils/db';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
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
    session.user = user;
    await session.save();
    res.status(201).json({ success: true });
  } catch (error) {
    const err = error as { response?: { status?: number }; data?: unknown };
    res.status(err.response?.status || 500).json(err.data);
  }
}
