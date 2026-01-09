const Joi = require('joi');

// 🛡️ ESQUEMA DE PRODUCTOS
const productSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  description: Joi.string().trim().max(200).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.max': 'La descripción no puede pasar los 200 caracteres'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser un número mayor a 0',
    'any.required': 'El precio es obligatorio'
  }),
  category: Joi.string().required().messages({
    'any.required': 'La categoría es obligatoria'
  })
});

// 🛡️ ESQUEMA DE USUARIOS
const userSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre es demasiado corto'
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Debe ingresar un correo electrónico válido',
    'any.required': 'El email es obligatorio'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres para ser segura',
    'any.required': 'La contraseña es obligatoria'
  }),
  isAdmin: Joi.boolean().default(false)
});

// MIDDLEWARES DE VALIDACIÓN
const validateProduct = (req, res, next) => {
  // abortEarly: false permite ver todos los errores si los hay
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ 
      message: "Error de validación en producto", 
      details: error.details.map(d => d.message) // Muestra todos los mensajes
    });
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ 
      message: "Error de validación en usuario", 
      details: error.details.map(d => d.message) 
    });
  }
  next();
};

module.exports = { validateProduct, validateUser };