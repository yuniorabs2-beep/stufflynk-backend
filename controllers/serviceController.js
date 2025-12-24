// controllers/serviceController.js
const Offering = require('../models/offering');

// Obtener todos los servicios
const getServices = async (req, res) => {
  try {
    const services = await Offering.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error });
  }
};

// Crear un nuevo servicio
const createService = async (req, res) => {
  try {
    const { name, description, price, user } = req.body;
    const offering = new Offering({ name, description, price, user });
    const savedOffering = await offering.save();
    res.status(201).json(savedOffering);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error });
  }
};

module.exports = { getServices, createService };