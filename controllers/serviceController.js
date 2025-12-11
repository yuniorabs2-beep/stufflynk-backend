const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');

// @desc    Crear un nuevo servicio
// @route   POST /services
// @access  Privado (requiere token)
const createService = asyncHandler(async (req, res) => {
  const { title, description, category, availability } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error('Todos los campos son obligatorios');
  }

  const service = await Service.create({
    title,
    description,
    category,
    availability,
    user: req.user.id, // usuario autenticado
  });

  res.status(201).json(service);
});

// @desc    Obtener todos los servicios
// @route   GET /services
// @access  Público
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().populate('user', 'name email');
  res.json(services);
});

// @desc    Obtener un servicio por ID
// @route   GET /services/:id
// @access  Público
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).populate('user', 'name email');

  if (!service) {
    res.status(404);
    throw new Error('Servicio no encontrado');
  }

  res.json(service);
});

// @desc    Actualizar un servicio
// @route   PUT /services/:id
// @access  Privado (solo dueño del servicio)
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Servicio no encontrado');
  }

  if (service.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('No autorizado');
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedService);
});

// @desc    Eliminar un servicio
// @route   DELETE /services/:id
// @access  Privado (solo dueño del servicio)
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Servicio no encontrado');
  }

  if (service.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('No autorizado');
  }

  await service.remove();
  res.json({ message: 'Servicio eliminado correctamente' });
});

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};