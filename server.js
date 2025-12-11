const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const mainRoutes = require('./routes/mainRoutes.js');

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Rutas principales
app.use('/api', mainRoutes);

// Ruta raíz para verificar estado
app.get('/', (req, res) => {
  res.send('Servidor UniTrade funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});