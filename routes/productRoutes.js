const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../auth/authMiddleware'); // ✅ corregido

const router = express.Router();

// Crear producto (requiere token)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newProduct = new Product({
      name,
      description,
      owner: req.user.id // ✅ usar "owner" porque así está definido en el modelo
    });
    await newProduct.save();

    res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
  } catch (err) {
    console.error('❌ Error al crear producto:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "name email");
    res.json(products);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("owner", "name email");
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    console.error('❌ Error al obtener producto:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Eliminar producto (requiere token y ser dueño)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    // Validar que el dueño sea el usuario autenticado
    if (product.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado para eliminar este producto' });
    }

    await product.deleteOne();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar producto:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;