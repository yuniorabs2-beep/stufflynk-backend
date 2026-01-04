const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // En versiones modernas de Mongoose ya no necesitas pasar opciones extra
    // Pero añadimos un tiempo de espera por si vuelves a usar Atlas con datos móviles
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Si en 5 segundos no conecta, da error pero no cuelga todo
    });

    console.log(`✅ MongoDB Local Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    // No usamos process.exit(1) para que el servidor intente seguir vivo 
    // y puedas arreglar el problema sin que Nodemon se detenga.
  }
};

module.exports = connectDB;