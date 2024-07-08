const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Butwal8",
  host: "localhost",
  port: 5432,
  database: "deraa",
});

const createTblQuery = `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (50) UNIQUE NOT NULL);`;

pool
  .query(createTblQuery)
  .then((Response) => {
    console.log("Table user Created");
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
