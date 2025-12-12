const express = require('express');
const router = express.Router();
const { protect } = require('../auth/authMiddleware');
const {
  createDeal,
  getDeals,
  updateDealStatus,
  deleteDeal,
} = require('../controllers/dealController');

// Crear un nuevo convenio
router.post('/', protect, createDeal);

// Obtener todos los convenios
router.get('/', protect, getDeals);

// Actualizar estado de un convenio
router.put('/:id', protect, updateDealStatus);

// Eliminar un convenio
router.delete('/:id', protect, deleteDeal);

module.exports = router;