const { getUser, createUser } = require('../models/apartment');

const listUser = async (req, res) => {
  try {
    const apartments = await getUser();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newApartment = await createUser(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listUser, addUser };
