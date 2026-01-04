const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet"); // 🛡️ Mejora de seguridad 1
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const productRoutes = require("./routes/productRoutes");
const dealRoutes = require("./routes/dealRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ MIDDLEWARES GLOBALES
app.use(helmet()); // 🛡️ Protege las cabeceras HTTP
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ RUTA DE BIENVENIDA (Mejora 2)
app.get("/", (req, res) => {
  res.send("Stufflynk API is running...");
});

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deals", dealRoutes);

// Middleware de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});