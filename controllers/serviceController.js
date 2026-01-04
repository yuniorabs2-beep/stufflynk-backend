const Offering = require("../models/offering");

// Crear servicio
const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Offering({ name, description, price, owner: req.user?._id });
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear servicio", error: error.message });
  }
};

const listServices = async (req, res) => {
  try {
    const services = await Offering.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error al listar servicios", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Offering.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicio", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = await Offering.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Servicio no encontrado" });

    service.name = name ?? service.name;
    service.description = description ?? service.description;
    service.price = price ?? service.price;

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar servicio", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Offering.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Servicio no encontrado" });

    await service.deleteOne();
    res.json({ message: "Servicio eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar servicio", error: error.message });
  }
};

module.exports = {
  createService,
  listServices,
  getServiceById,
  updateService,
  deleteService,
};
