// controllers/productController.js
const asyncHandler = require("express-async-handler");
const validator = require("validator");
const Product = require("../models/product");

// Crear producto
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  if (!validator.isLength(name, { min: 2, max: 120 })) {
    return res.status(400).json({ message: "Nombre inválido" });
  }
  if (!validator.isLength(description, { min: 10, max: 1000 })) {
    return res.status(400).json({ message: "Descripción inválida" });
  }
  if (!validator.isFloat(String(price), { min: 0 })) {
    return res.status(400).json({ message: "Precio inválido" });
  }

  const product = await Product.create({
    name: validator.escape(name),
    description: validator.escape(description),
    price: Number(price),
    user: req.user?.id, // protección si req.user no está definido
  });

  res.status(201).json(product);
});

// Listar productos
const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();
  res.json(products);
});

// Obtener producto por ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const product = await Product.findById(id).lean();
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.json(product);
});

// Actualizar producto
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (req.user && String(product.user) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  if (name) {
    if (!validator.isLength(name, { min: 2, max: 120 })) {
      return res.status(400).json({ message: "Nombre inválido" });
    }
    product.name = validator.escape(name);
  }
  if (description) {
    if (!validator.isLength(description, { min: 10, max: 1000 })) {
      return res.status(400).json({ message: "Descripción inválida" });
    }
    product.description = validator.escape(description);
  }
  if (price !== undefined) {
    if (!validator.isFloat(String(price), { min: 0 })) {
      return res.status(400).json({ message: "Precio inválido" });
    }
    product.price = Number(price);
  }

  const updated = await product.save();
  res.json(updated);
});

// Eliminar producto
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (req.user && String(product.user) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  await product.deleteOne();
  res.status(204).send();
});

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
