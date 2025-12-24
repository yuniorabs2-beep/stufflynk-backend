// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const dealRoutes = require('./routes/dealRoutes');   // Trade/Deal
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const mainRoutes = require('./routes/mainRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/deals', dealRoutes);     // aquí se manejan los trades/deals
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/main', mainRoutes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));