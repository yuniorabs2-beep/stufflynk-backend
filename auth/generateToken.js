// auth/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d', // el token expira en 30 días
    }
  );
};

module.exports = generateToken;