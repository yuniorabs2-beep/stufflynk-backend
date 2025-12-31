const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'fallbacksecret', // FIX: valor por defecto si falta la variable
    {
      expiresIn: '30d', // el token expira en 30 días
    }
  );
};

module.exports = generateToken;