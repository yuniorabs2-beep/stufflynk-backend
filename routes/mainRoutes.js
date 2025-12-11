const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../auth/authMiddleware');
const productRoutes = require('./productRoutes'); // Importar rutas de productos

const router = express.Router();

// Rutas de usuarios
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Acceso autorizado',
    user: req.user
  });
});

// Rutas de productos
router.use('/products', productRoutes);

module.exports = router;