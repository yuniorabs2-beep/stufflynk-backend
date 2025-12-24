require('dotenv').config(); // ← carga variables de entorno desde .env
const express = require('express');
const connectDB = require('./config/db'); // ✅ coincide con tu carpeta config/db.js
const mainRoutes = require('./routes/mainRoutes');
const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para leer JSON en peticiones
app.use(express.json());

// Importar rutas principales con prefijo /api
app.use('/api', mainRoutes);

// Puerto de conexión (usa el de .env si existe, o 5000 por defecto)
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});