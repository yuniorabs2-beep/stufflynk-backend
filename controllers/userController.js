const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../auth/generateToken');

// Registro
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    return res.json({ message: 'Nombre, email y contraseña son obligatorios' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return res.json({ message: 'El correo electrónico ya está registrado' });
  }

  // Creamos el usuario (el role será 'user' por defecto si el modelo está bien configurado)
  const user = await User.create({ 
    name, 
    email, 
    password, 
    role: role || 'user' 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({ message: 'Email y contraseña son obligatorios' });
  }

  const user = await User.findOne({ email });

  // 🚨 REVISIÓN: Asegúrate que matchPassword esté definido en models/user.js
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    return res.json({ message: 'Credenciales inválidas: email o contraseña incorrectos' });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});
  
module.exports = { registerUser, loginUser, getUsers, getUserById };