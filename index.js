// index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mainRoutes = require("./routes/mainRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales bajo /api
app.use("/api", mainRoutes);

// Middleware de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;
