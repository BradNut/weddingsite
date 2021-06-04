import mongoose from 'mongoose';

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: String,
  note: String,
  rsvpSubmitted: {
    type: Boolean,
    deafult: false,
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
    },
  ],
});

export default mongoose.models.Group || mongoose.model('Group', groupSchema);
