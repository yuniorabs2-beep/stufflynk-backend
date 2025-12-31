// controllers/serviceController.js
const asyncHandler = require("express-async-handler");
const validator = require("validator");
const Offering = require("../models/offering");

// Crear servicio
const createService = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || price === undefined) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  if (!validator.isLength(title, { min: 2, max: 120 })) {
    return res.status(400).json({ message: "Título inválido" });
  }
  if (!validator.isLength(description, { min: 10, max: 1000 })) {
    return res.status(400).json({ message: "Descripción inválida" });
  }
  if (!validator.isFloat(String(price), { min: 0 })) {
    return res.status(400).json({ message: "Precio inválido" });
  }

  const service = await Offering.create({
    title: validator.escape(title),
    description: validator.escape(description),
    price: Number(price),
    user: req.user?.id, // protección si req.user no está definido
  });

  res.status(201).json(service);
});

// Listar servicios
const getServices = asyncHandler(async (req, res) => {
  const services = await Offering.find().populate("user", "name email").lean();
  res.json(services);
});

// Obtener servicio por ID
const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const service = await Offering.findById(id).populate("user", "name email").lean();
  if (!service) {
    return res.status(404).json({ message: "Servicio no encontrado" });
  }

  res.json(service);
});

module.exports = {
  createService,
  getServices,
  getServiceById,
};
