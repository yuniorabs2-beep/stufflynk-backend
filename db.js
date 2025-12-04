require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

module.exports = mongoose;