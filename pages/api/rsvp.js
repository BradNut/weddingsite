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
    res.status(200).json({ status: 'SUCCESS', groupId: 'TESTID_12345' });
  } else {
    const knex = await connectDb();
    const { firstName, lastName } = await req.body;

    try {
      const result = await knex('guests')
        .where(function () {
          this.where(
            'first_name',
            'like',
            `%${escape(firstName.trim())}%`
          ).where('last_name', 'like', `%${escape(lastName.trim())}%`);
        })
        .select(
          'first_name',
          'last_name',
          'role',
          'rsvp_status',
          'dietary_notes',
          'song_requests',
          'has_plus_one',
          'plus_one',
          'plus_one_first_name',
          'plus_one_last_name',
          'party_id',
          'search_count'
        )
        .first();
      if (result) {
        res.status(200).json({ status: 'SUCCESS', groupId: result.party_id });
      } else {
        res.status(400).json({ status: 'FAILURE' });
        return;
      }
    } catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json({ status: 'FAILURE' });
    }
  }
});
