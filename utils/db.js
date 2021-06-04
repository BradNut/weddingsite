// import mongo from 'mongodb';
import mongoose from 'mongoose';

// const { MongoClient } = mongo;

const url = process.env.MONGO_URL;

async function connectDb() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // try {
  //   // Confirm connection
  //   await client.db('waddle').command({ ping: 1 });
  //   console.log('🗄️ Connected to DB Success');
  // } catch (e) {
  //   console.error(e);
  //   // If there is a problem close connection to db
  //   await client.close();
  // }
}

export default connectDb;
