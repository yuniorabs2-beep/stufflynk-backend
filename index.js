require('dotenv').config(); // ← carga variables de entorno desde .env
const express = require('express');
const connectDB = require('./config/db'); // ✅ corregido: coincide con tu carpeta config/db.js
const mainRoutes = require('./routes/mainRoutes');
const app = express();

// Conexión a la base de datos
connectDB();

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