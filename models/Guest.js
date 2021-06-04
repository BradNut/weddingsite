import mongoose from 'mongoose';

const { Schema } = mongoose;

const guestSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: String,
  rsvpStatus: {
    type: String,
    enum: ['invited', 'accepted', 'declined'],
    default: 'invited',
  },
  dietaryNotes: String,
  songRequests: String,
  hasPlusOne: { type: Boolean, default: false },
  plusOne: { type: Boolean, default: false },
  plusOneFirstName: String,
  plusOneLastName: String,
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group.guests',
  },
});

export default mongoose.models.Guest || mongoose.model('Guest', guestSchema);
