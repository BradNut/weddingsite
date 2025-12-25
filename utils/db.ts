import mongoose from 'mongoose';

const url = process.env.MONGO_URL as string;

async function connectDb(): Promise<typeof mongoose | void> {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(url);
}

export default connectDb;
