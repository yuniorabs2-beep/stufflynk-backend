// routes/dealRoutes.js
const express = require("express");
const router = express.Router();
const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");
const { protect } = require("../auth/authMiddleware");

// Listar todos los deals del usuario autenticado
router.get("/", protect, getDeals);

// Obtener un deal por ID (requiere autenticación)
router.get("/:id", protect, getDealById);

// Crear un nuevo deal (requiere autenticación)
router.post("/", protect, createDeal);

// Actualizar un deal por ID (requiere autenticación)
router.put("/:id", protect, updateDeal);

// Eliminar un deal por ID (requiere autenticación)
router.delete("/:id", protect, deleteDeal);

module.exports = router;
