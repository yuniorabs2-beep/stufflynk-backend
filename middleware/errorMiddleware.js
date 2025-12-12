// middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Si el status es 200, lo cambiamos a 500 (error interno)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // En producción no mostramos el stack trace
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };