// auth/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar el usuario decodificado en la request
    req.user = decoded;

    // Continuar con la siguiente función/middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;