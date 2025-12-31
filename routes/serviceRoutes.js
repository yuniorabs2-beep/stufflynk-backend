// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const {
  createService,
  getServices,
  getServiceById,
} = require("../controllers/serviceController");
const { protect } = require("../auth/authMiddleware");

// Listar todos los servicios (público)
router.get("/", getServices);

// Obtener un servicio por ID (público)
router.get("/:id", getServiceById);

// Crear un nuevo servicio (requiere autenticación)
router.post("/", protect, createService);

module.exports = router;
