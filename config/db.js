const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Usamos 127.0.0.1 para evitar problemas de resolución de nombres
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stufflynk");
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    // No cerramos el proceso para que Nodemon no se buclee, 
    // pero te avisará del error en rojo.
  }
};

module.exports = connectDB;