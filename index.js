
require('dotenv').config(); // ← carga variables de entorno desde .env
const express = require('express');
const db = require('./db'); // ← activa la conexión a MongoDB Atlas desde db.js
const mainRoutes = require('./routes/mainRoutes');
const app = express();

// Middleware para leer JSON en peticiones
app.use(express.json());

// Importar rutas principales
app.use('/', mainRoutes);

// Puerto de conexión (usa el de .env si existe, o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});