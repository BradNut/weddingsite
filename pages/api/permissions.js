import withSession from '../../lib/session';
import User from '../../models/User';

const rootDomain = process.env.ROOT_DOMAIN;
const protectedRoutes = [`${rootDomain}/register`, `${rootDomain}/createguest`];

export default async function permissions(req, res) {
  const { method, session } = req;

  const { user } = session;

  if (!user?.isLoggedIn) {
    res.status(401).end();
    return;
  }

  // const user = req.session.get('user');
  // console.log(JSON.stringify(req.body));
  res.status(200).json({});
  // if (user) {
  //   const dbUser = await User.findOne({ _id: user.id });
  //   const { role } = dbUser;
  //   const referrer = req?.headers?.referrer;
  //   let permitted = false;
  //   if (protectedRoutes.includes(referrer)) {
  //     if (role === 'admin') {
  //       permitted = true;
  //     }
  //   }
  //   res.json({
  //     permitted,
  //   });
  // } else {
  //   res.json({
  //     permissted: false,
  //   });
  // }
}
