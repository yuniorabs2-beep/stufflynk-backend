// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../auth/authMiddleware'); // ajusta si tu middleware está en otra carpeta
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require('../controllers/userController');

// Registrar usuario
router.post('/register', registerUser);

// Login usuario
router.post('/login', loginUser);

// Perfil de usuario (requiere autenticación)
router.get('/profile', protect, getUserProfile);

// Actualizar perfil (requiere autenticación)
router.put('/profile', protect, updateUserProfile);

// Eliminar usuario (requiere autenticación)
router.delete('/profile', protect, deleteUser);

module.exports = router;