// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Opciones recomendadas para evitar advertencias y mejorar estabilidad
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

module.exports = connectDB;