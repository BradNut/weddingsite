import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'guest'],
    default: 'guest',
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
