// routes/dealRoutes.js
const express = require('express');
const router = express.Router();

const { getDeals, createDeal } = require('../controllers/dealController');
const { protect } = require('../auth/authMiddleware');

// Obtener todos los deals (público o autenticado según tu lógica)
router.get('/', getDeals);

// Crear un nuevo deal (requiere token)
router.post('/', protect, createDeal);

module.exports = router;