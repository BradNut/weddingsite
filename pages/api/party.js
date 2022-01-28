import escape from 'escape-html';
import withSession from '../../lib/session';
import Group from '../../models/Group';
import Guest from '../../models/Guest';
import connectDb from '../../utils/db';

export default withSession(async (req, res) => {
  const {
    query: { id },
    method,
    body,
    session,
  } = req;

  const { user } = session;

  if (!user?.isLoggedIn) {
    res.status(401).end();
    return;
  }

  // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
  // In production just: const knex = await connectDb();
  let knex;
  if (process.env.SITE_ENV !== 'TEST_SITE') {
    knex = await connectDb();
  }

  switch (method) {
    case 'POST':
      try {
        // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
        if (process.env.SITE_ENV === 'TEST_SITE') {
          console.log('DONE!');
          res.status(200).json(JSON.stringify({ message: 'SUCCESS' }));
        } else {
          const { groupId, guests, note } = body;
          for (const guest of guests) {
            const guestData = await knex('guests')
              .where({ id: guest.id })
              .first();
            const accepted = guest?.rsvpStatus === 'accepted';
            guestData.rsvp_status =
              guest?.rsvpStatus !== 'invited' ? guest?.rsvpStatus : 'invited';
            guestData.dietary_notes = escape(guest?.dietaryNotes);
            guestData.song_requests = escape(guest?.songRequests);
            guestData.plus_one =
              (guestData?.has_plus_one && guest?.plusOne && accepted) || false;
            guestData.plus_one_first_name =
              (guestData?.has_plus_one && guest?.plusOneFirstName) || '';
            guestData.plus_one_last_name =
              (guestData?.has_plus_one && guest?.plusOneLastName) || '';
            // console.log('guestData modified', guestData);
            await knex('guests').where({ id: guest.id }).update(guestData);
          }
          const updateParty = { note: escape(note), rsvp_submitted: true };
          await knex('party').where({ id: groupId }).update(updateParty);
          res.status(200).json(JSON.stringify({ message: 'SUCCESS' }));
        }
      } catch (error) {
        const { response: fetchResponse } = error;
        console.error('error', error);
        res
          .status(fetchResponse?.status || 500)
          .json({ message: 'Unable to RSVP Your Group' });
      }
      break;
    default:
      res.status(400).json({ message: 'Unable to RSVP Your Group' });
      break;
  }
});
