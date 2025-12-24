// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', getUsers);

// Registrar usuario
router.post('/', registerUser);

// Login usuario
router.post('/login', loginUser);

module.exports = router;
// ✅ Ruta para login de usuario
router.post('/login', loginUser);

module.exports = router;