import knex from 'knex';
import configs from '../knexfile';

async function connectDb() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  return knex(configs);
}

export default connectDb;
