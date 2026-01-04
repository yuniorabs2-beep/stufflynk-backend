const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        return res.json({ message: 'Usuario no encontrado con este token' });
      }

      next();
    } catch (error) {
      res.status(401);
      return res.json({ message: 'Token inválido o expirado' });
    }
  } else {
    res.status(401);
    return res.json({ message: 'No autorizado, token no encontrado' });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    return res.json({ message: 'No autorizado, permisos insuficientes' });
  }
};

module.exports = { protect, admin };
