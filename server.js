require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const dealRoutes = require('./routes/dealRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para leer JSON en peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api', mainRoutes); // health y otras rutas principales

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});