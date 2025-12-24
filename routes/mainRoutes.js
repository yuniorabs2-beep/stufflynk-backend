// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Ruta simple de prueba para verificar que el servidor está vivo
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;