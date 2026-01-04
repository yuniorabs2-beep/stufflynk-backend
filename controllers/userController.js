const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../auth/generateToken');

// Registro
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body; // <-- ahora acepta role

  if (!name || !email || !password) {
    res.status(400);
    return res.json({ message: 'Todos los campos son obligatorios' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return res.json({ message: 'Usuario ya existe' });
  }

  const user = await User.create({ name, email, password, role }); // <-- guarda role

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // <-- devuelve role
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Datos inválidos' });
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

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // <-- devuelve role
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Obtener todos los usuarios (solo admin)
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // nunca devolver contraseñas
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID (solo admin)
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'ID inválido' });
  }
});

module.exports = { registerUser, loginUser, getUsers, getUserById };
