// apartment.js
const pool = require('../db');

const getUser = async () => {
  const res = await pool.query('SELECT * FROM apartments');
  return res.rows;
};

const createUser = async (apartment) => {
  const { landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description } = apartment;
  const res = await pool.query(
    'INSERT INTO apartments (landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description]
  );
  return res.rows[0];
};

module.exports = { getUser, createUser };
