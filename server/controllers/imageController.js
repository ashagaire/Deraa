const { getImage, createImage } = require('../models/image');

const listImage = async (req, res) => {
  try {
    const apartments = await getImage();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addImage = async (req, res) => {
  try {
    const newApartment = await createImage(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listImage, addImage };
