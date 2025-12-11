const express = require('express');
const router = express.Router();
const { protect } = require('../auth/authMiddleware');
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// Crear un nuevo servicio
router.post('/', protect, createService);

// Obtener todos los servicios
router.get('/', getServices);

// Obtener un servicio específico por ID
router.get('/:id', getServiceById);

// Actualizar un servicio
router.put('/:id', protect, updateService);

// Eliminar un servicio
router.delete('/:id', protect, deleteService);

module.exports = router;