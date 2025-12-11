const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado, token faltante' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    next();
  } catch (err) {
    console.error("❌ Error en checkToken:", err.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = checkToken;