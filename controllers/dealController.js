const asyncHandler = require('express-async-handler');
const Trade = require('../models/Trade');

// @desc    Crear un nuevo convenio (deal)
// @route   POST /deals
// @access  Privado
const createDeal = asyncHandler(async (req, res) => {
  const { serviceOffered, serviceRequested, notes } = req.body;

  if (!serviceOffered || !serviceRequested) {
    res.status(400);
    throw new Error('Debes especificar los servicios ofrecido y solicitado');
  }

  const deal = await Trade.create({
    serviceOffered,
    serviceRequested,
    users: [req.user.id], // el usuario autenticado inicia el convenio
    notes,
  });

  res.status(201).json(deal);
});

// @desc    Obtener todos los convenios
// @route   GET /deals
// @access  Privado
const getDeals = asyncHandler(async (req, res) => {
  const deals = await Trade.find()
    .populate('serviceOffered')
    .populate('serviceRequested')
    .populate('users', 'name email');
  res.json(deals);
});

// @desc    Actualizar estado de un convenio
// @route   PUT /deals/:id
// @access  Privado
const updateDealStatus = asyncHandler(async (req, res) => {
  const deal = await Trade.findById(req.params.id);

  if (!deal) {
    res.status(404);
    throw new Error('Convenio no encontrado');
  }

  // Solo los usuarios involucrados pueden actualizar el estado
  if (!deal.users.some(userId => userId.toString() === req.user.id)) {
    res.status(401);
    throw new Error('No autorizado');
  }

  deal.status = req.body.status || deal.status;
  await deal.save();

  res.json(deal);
});

// @desc    Eliminar un convenio
// @route   DELETE /deals/:id
// @access  Privado
const deleteDeal = asyncHandler(async (req, res) => {
  const deal = await Trade.findById(req.params.id);

  if (!deal) {
    res.status(404);
    throw new Error('Convenio no encontrado');
  }

  // Solo los usuarios involucrados pueden eliminar
  if (!deal.users.some(userId => userId.toString() === req.user.id)) {
    res.status(401);
    throw new Error('No autorizado');
  }

  await deal.deleteOne(); // forma moderna, evita warnings
  res.json({ message: 'Convenio eliminado correctamente' });
});

module.exports = {
  createDeal,
  getDeals,
  updateDealStatus,
  deleteDeal,
};