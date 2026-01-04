const express = require("express");
const router = express.Router();

const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

const { protect, admin } = require("../auth/authMiddleware");

// Crear deal
router.post("/", protect, admin, createDeal);

// Listar deals
router.get("/", getDeals);

// Obtener deal por ID
router.get("/:id", getDealById);

// Actualizar deal
router.put("/:id", protect, admin, updateDeal);

// Eliminar deal
router.delete("/:id", protect, admin, deleteDeal);

module.exports = router;
