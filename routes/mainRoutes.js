// routes/mainRoutes.js
const express = require("express");
const router = express.Router();

// Importar rutas
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const serviceRoutes = require("./serviceRoutes");
const dealRoutes = require("./dealRoutes");

// Rutas principales
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/services", serviceRoutes);
router.use("/deals", dealRoutes);

module.exports = router;
