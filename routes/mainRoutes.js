// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
// const productRoutes = require('./productRoutes'); // activar cuando exista

const router = express.Router();

// Rutas de usuarios
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Acceso autorizado',
    user: req.user
  });
});

// Rutas de productos (activar cuando productRoutes esté listo)
// router.use('/products', productRoutes);

module.exports = router;