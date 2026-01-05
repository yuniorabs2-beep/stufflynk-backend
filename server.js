const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express"); 
// 🚩 QUITAMOS swagger-jsdoc porque es lo que causa el error del cstNode
const swaggerDocument = require("./swagger.json"); // 👈 Importamos el JSON directamente

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
app.use(helmet()); 
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DOCUMENTACIÓN (Ahora usa el archivo JSON directo)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ RUTA DE BIENVENIDA
app.get("/", (req, res) => {
  res.send("Stufflynk API is running... Go to /api-docs");
});

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deals", dealRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});