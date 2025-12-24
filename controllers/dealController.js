// controllers/dealController.js
const Trade = require('../models/trade');

// Obtener todos los trades
const getDeals = async (req, res) => {
  try {
    const trades = await Trade.find()
      .populate('serviceOffered')
      .populate('serviceRequested')
      .populate('users');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los trades', error });
  }
};

// Crear un nuevo trade
const createDeal = async (req, res) => {
  try {
    const { serviceOffered, serviceRequested, users, notes } = req.body;

    const trade = new Trade({
      serviceOffered,
      serviceRequested,
      users,
      notes,
    });

    const savedTrade = await trade.save();
    res.status(201).json(savedTrade);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el trade', error });
  }
};

// Obtener un trade por ID
const getDealById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)
      .populate('serviceOffered')
      .populate('serviceRequested')
      .populate('users');

    if (!trade) {
      return res.status(404).json({ message: 'Trade no encontrado' });
    }

    res.json(trade);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el trade', error });
  }
};

module.exports = {
  getDeals,
  createDeal,
  getDealById,
};