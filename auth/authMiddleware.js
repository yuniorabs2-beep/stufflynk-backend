// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  let token;

  // Verificamos si el header Authorization existe y empieza con "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraer el token
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token con la clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar el usuario en la base de datos y excluir el campo password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      next(); // continuar al siguiente middleware o ruta
    } catch (error) {
      console.error('❌ Error en authMiddleware:', error.message);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }
};

module.exports = authMiddleware;