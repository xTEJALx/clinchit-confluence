const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clinchit_confluence',
  password: 'mysecretpassword',
  port: 5432,
});

module.exports = pool;
