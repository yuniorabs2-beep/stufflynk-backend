// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../auth/authMiddleware");
const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Listar todos los productos
router.get("/", listProducts);

// Crear un nuevo producto (requiere autenticación)
router.post("/", protect, createProduct);

// Obtener un producto por ID
router.get("/:id", getProductById);

// Actualizar un producto por ID (requiere autenticación)
router.put("/:id", protect, updateProduct);

// Eliminar un producto por ID (requiere autenticación)
router.delete("/:id", protect, deleteProduct);

module.exports = router;
