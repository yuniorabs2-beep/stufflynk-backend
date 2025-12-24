// controllers/productController.js
const Product = require('../models/product');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, price, user } = req.body;
    const product = await Product.create({ name, description, price, user });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, user } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, user },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};