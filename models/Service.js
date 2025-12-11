const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db'); // tu función de conexión a MongoDB Atlas
const { errorHandler } = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const dealRoutes = require('./routes/dealRoutes');

const port = process.env.PORT || 3000;

connectDB();

const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/deals', dealRoutes);

// Middleware de errores
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));