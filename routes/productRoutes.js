const express = require("express");
const router = express.Router();

// Importación de controladores
const { 
    listProducts, 
    createProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");

// Middlewares de autenticación
const { protect, admin } = require("../auth/authMiddleware");

// Importación corregida para eliminar el error de "casing" (v minúscula)
const { validateProduct } = require("../middleware/validationMiddleware");

/**
 * @swagger
 * tags:
 * name: Productos
 * description: Gestión de inventario de Stufflynk
 */

router.route("/")
    .get(listProducts)
    .post(protect, validateProduct, createProduct);

router.route("/:id")
    .get(getProductById)
    .put(protect, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;