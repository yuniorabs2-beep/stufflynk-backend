const express = require('express');
const router = express.Router();
const { protect } = require('../auth/authMiddleware');
const {
  createTrade,
  getTrades,
  updateTradeStatus,
  deleteTrade,
} = require('../controllers/tradeController');

// Crear un nuevo convenio
router.post('/', protect, createTrade);

// Obtener todos los convenios
router.get('/', protect, getTrades);

// Actualizar estado de un convenio
router.put('/:id', protect, updateTradeStatus);

// Eliminar un convenio
router.delete('/:id', protect, deleteTrade);

module.exports = router;