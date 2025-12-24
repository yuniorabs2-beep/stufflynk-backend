const express = require('express');
const router = express.Router();

const {
  registerUser,
  authUser,
  getProfile,
  updateProfile,
  deleteUser,
} = require('../controllers/userController');

const { protect } = require('../auth/authMiddleware');

// Registrar usuario
router.post('/register', registerUser);

// Login usuario
router.post('/login', authUser);

// Perfil del usuario autenticado
router.get('/profile', protect, getProfile);

// Actualizar perfil del usuario autenticado
router.put('/profile', protect, updateProfile);

// Eliminar usuario autenticado
router.delete('/profile', protect, deleteUser);

module.exports = router;