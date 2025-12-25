import mongoose from 'mongoose';
import Group from '../models/Group';
import Guest from '../models/Guest';
import connectDb from '../utils/db';
import { parties } from './data';

export async function insertSeedData(): Promise<void> {
  console.log('Connect');
  await connectDb();
  console.log('Create collection');
  for (const party of parties) {
    const guestIds: mongoose.Types.ObjectId[] = [];
    for (const guest of party?.guests) {
      const { _id: guestId } = await Guest.create({
        firstName: guest.firstName,
        lastName: guest.lastName,
        role: guest.role,
      });
      guestIds.push(guestId);
    }
    console.log(JSON.stringify(guestIds));
    const { _id: groupId } = await Group.create({
      guests: guestIds,
    });
    for (const guestId of guestIds) {
      console.log(JSON.stringify(guestId));
      console.log(JSON.stringify(groupId));
      const update = {
        group: groupId,
      };
      Guest.findByIdAndUpdate(guestId, update);
    }
  }
}
