// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');

// Obtener todos los servicios
router.get('/', getServices);

// Crear un nuevo servicio
router.post('/', createService);

module.exports = router;