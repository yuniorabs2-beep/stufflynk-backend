const express = require("express");
const router = express.Router();

const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../auth/authMiddleware");

// Crear producto
router.post("/", protect, admin, createProduct);

// Listar productos
router.get("/", listProducts);

// Obtener producto por ID
router.get("/:id", getProductById);

// Actualizar producto
router.put("/:id", protect, admin, updateProduct);

// Eliminar producto
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
