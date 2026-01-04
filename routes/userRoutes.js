const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const { protect, admin } = require("../auth/authMiddleware");

// Registro de usuario
router.post("/register", registerUser);

// Login de usuario
router.post("/login", loginUser);

// Obtener todos los usuarios (solo admin)
router.get("/", protect, admin, getUsers);

module.exports = router;
