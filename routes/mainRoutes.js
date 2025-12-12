// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Ruta principal de prueba
router.get('/', (req, res) => {
  res.send('API de UniTrade funcionando desde mainRoutes...');
});

module.exports = router;