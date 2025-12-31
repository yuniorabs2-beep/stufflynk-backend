const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraer token
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario y asignarlo al request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o no autorizado' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }
};

module.exports = { protect };