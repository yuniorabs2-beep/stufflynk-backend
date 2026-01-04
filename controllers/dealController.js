const Deal = require("../models/deal"); // ✅ apunta al archivo correcto

// Crear un nuevo deal
const createDeal = async (req, res) => {
  try {
    const { title, description, price, adminId } = req.body;

    const newDeal = new Deal({ title, description, price, adminId });
    const savedDeal = await newDeal.save();

    res.status(201).json(savedDeal);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el deal", error: error.message });
  }
};

// Obtener todos los deals
const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los deals", error: error.message });
  }
};

// Obtener un deal por ID
const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el deal", error: error.message });
  }
};

// Actualizar un deal
const updateDeal = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }

    deal.title = title ?? deal.title;
    deal.description = description ?? deal.description;
    deal.price = price ?? deal.price;

    const updatedDeal = await deal.save();
    res.json(updatedDeal);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el deal", error: error.message });
  }
};

// Eliminar un deal
const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }

    await deal.deleteOne();
    res.json({ message: "Deal eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el deal", error: error.message });
  }
};

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};
