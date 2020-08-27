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

const getByTCIN = (tcin, cb) => {
  const query = `select * from products WHERE product_id = ${tcin}`
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res.rows)
    }
  })
}

const searchByName = (name, cb) => {
  const query = `select * from products where product_name ilike '%${name}%' order by 1;`
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb (null, res.rows);
    }
  })
}

module.exports = {getByTCIN, searchByName}

// select * from products where product_name ilike 'string%' order by 1;