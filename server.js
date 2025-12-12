// server.js
const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Conectar a la base de datos ANTES de levantar el servidor
connectDB();

// Inicializar la app
const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de UniTrade funcionando...');
});

// Rutas de usuarios
app.use('/api/users', require('./routes/userRoutes'));

// Middleware de errores (siempre al final)
app.use(errorHandler);

// Puerto desde .env o por defecto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});