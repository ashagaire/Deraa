const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Butwal8",
  host: "localhost",
  port: 5432,
  database: "Deraa",
});


module.exports = pool;
