const env = require('dotenv').config();
const Pool = require('pg').Pool

if (env.error) {
  throw env.error;
}

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASS,
  host: 'localhost',
  database: 'target',
  port: 5432,
})

const test = (cb) => {
  const query = `select * from products`
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res.rows)
    }
  })
}

module.exports = {test}