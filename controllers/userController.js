const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // ✅ Importación correcta

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // La contraseña se encripta automáticamente en el modelo
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("❌ Error en registerUser:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("❌ Error en loginUser:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser };