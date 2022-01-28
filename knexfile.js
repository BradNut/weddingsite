/* prettier-ignore */
module.exports = {
  client: 'pg',
  connection: process.env.SUPABASE_URL,
  searchPath: ['knex','public'],
  pool: {
    min: 0,
    max: 50,
    acquireTimeoutMillis: 60 * 1000
  }
};
