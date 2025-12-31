const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../auth/generateToken');

// Registrar usuario
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// Login usuario
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Perfil usuario
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

module.exports = { registerUser, loginUser, getUserProfile };