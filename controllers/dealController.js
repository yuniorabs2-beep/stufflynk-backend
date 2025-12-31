// controllers/dealController.js
const asyncHandler = require("express-async-handler");
const validator = require("validator");
const Trade = require("../models/trade");

// Crear deal
const createDeal = asyncHandler(async (req, res) => {
  const { title, terms, price } = req.body;

  if (!title || !terms || price === undefined) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  if (!validator.isLength(title, { min: 3, max: 120 })) {
    return res.status(400).json({ message: "Título inválido" });
  }
  if (!validator.isLength(terms, { min: 10, max: 2000 })) {
    return res.status(400).json({ message: "Términos inválidos" });
  }
  if (!validator.isFloat(String(price), { min: 0 })) {
    return res.status(400).json({ message: "Precio inválido" });
  }

  const deal = await Trade.create({
    title: validator.escape(title),
    terms: validator.escape(terms),
    price: Number(price),
    user: req.user?.id, // protección si req.user no está definido
    status: "draft",
  });

  res.status(201).json(deal);
});

// Listar deals
const getDeals = asyncHandler(async (req, res) => {
  const deals = await Trade.find({ user: req.user?.id }).lean();
  res.json(deals);
});

// Obtener deal por ID
const getDealById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const deal = await Trade.findOne({ _id: id, user: req.user?.id }).lean();
  if (!deal) {
    return res.status(404).json({ message: "Deal no encontrado" });
  }

  res.json(deal);
});

// Actualizar deal
const updateDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, terms, price, status } = req.body;

  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const deal = await Trade.findById(id);
  if (!deal) {
    return res.status(404).json({ message: "Deal no encontrado" });
  }

  if (req.user && String(deal.user) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  if (title) deal.title = validator.escape(title);
  if (terms) deal.terms = validator.escape(terms);
  if (price !== undefined) {
    if (!validator.isFloat(String(price), { min: 0 })) {
      return res.status(400).json({ message: "Precio inválido" });
    }
    deal.price = Number(price);
  }
  if (status) {
    const allowed = ["draft", "active", "closed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }
    deal.status = status;
  }

  const updated = await deal.save();
  res.json(updated);
});

// Eliminar deal
const deleteDeal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const deal = await Trade.findById(id);
  if (!deal) {
    return res.status(404).json({ message: "Deal no encontrado" });
  }

  if (req.user && String(deal.user) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  await deal.deleteOne();
  res.status(204).send();
});

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};
