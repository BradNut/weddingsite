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

  const user = session.get('user');

  if (!user?.isLoggedIn) {
    res.status(401).end();
    return;
  }

  // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
  // In production just await connectDB()
  if (process.env.SITE_ENV !== 'TEST_SITE') {
    await connectDb();
  }

  const response = {};

  switch (method) {
    case 'GET':
      try {
        const group = await Group.findById(id);
        // console.log('group', group);
        response.id = id;
        const guestList = [];
        for (const guestId of group?.guests) {
          // console.log(JSON.stringify(guestId));
          const guestData = await Guest.findById(guestId);
          const guest = {
            id: guestData.id,
            firstName: guestData.firstName,
            lastName: guestData.lastName,
            role: guestData.role,
            rsvpStatus: guestData.rsvpStatus || '',
            dietaryNotes: guestData.dietaryNotes || '',
            songRequests: guestData.songRequests || '',
          };
          guestList.push(guest);
        }
        response.guests = guestList;
        response.note = group?.note || '';
        // console.log('response', response);
        res.status(200).json(JSON.stringify(response));
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
      break;
    case 'POST':
      try {
        // TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION
        if (process.env.SITE_ENV === 'TEST_SITE') {
          console.log('DONE!')
          res.status(200).json(JSON.stringify({ message: 'SUCCESS' }));
        } else {
          const { groupId, guests, note } = body;
          for (const guest of guests) {
            // console.log(`Updating ${guest.id} with status ${guest.rsvpStatus}`);
            const guestData = await Guest.findById(guest.id);
            const accepted = guest?.rsvpStatus === 'accepted';
            guestData.rsvpStatus =
              guest?.rsvpStatus !== 'invited' ? guest?.rsvpStatus : 'invited';
            guestData.dietaryNotes = guest?.dietaryNotes;
            guestData.songRequests = guest?.songRequests;
            guestData.plusOne =
              (guestData?.hasPlusOne && guest?.plusOne && accepted) || false;
            guestData.plusOneFirstName =
              (guestData?.hasPlusOne && guest?.plusOneFirstName) || '';
            guestData.plusOneLastName =
              (guestData?.hasPlusOne && guest?.plusOneLastName) || '';
            guestData.save();
          }
          await Group.findByIdAndUpdate(groupId, {
            note,
          });
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
