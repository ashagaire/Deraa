const { getApartments, createApartment } = require('../models/apartment');

const listApartments = async (req, res) => {
  try {
    const apartments = await getApartments();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addApartment = async (req, res) => {
  try {
    const newApartment = await createApartment(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listApartments, addApartment };
