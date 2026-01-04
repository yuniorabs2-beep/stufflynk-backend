const express = require("express");
const router = express.Router();
const {
  createService,
  listServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect, admin } = require("../auth/authMiddleware");

router.post("/", protect, admin, createService);
router.get("/", listServices);
router.get("/:id", getServiceById);
router.put("/:id", protect, admin, updateService);
router.delete("/:id", protect, admin, deleteService);

module.exports = router;
