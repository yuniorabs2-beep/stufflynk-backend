const Joi = require('joi');

// 🛡️ ESQUEMA DE PRODUCTOS (Ya validado)
const productSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  description: Joi.string().trim().max(200).required(),
  price: Joi.number().positive().required().messages({
    'number.positive': 'El precio debe ser un número mayor a 0'
  }),
  category: Joi.string().required()
});

// 🛡️ ESQUEMA DE USUARIOS (Blindaje de identidad)
const userSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    'string.min': 'El nombre es demasiado corto'
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Debe ingresar un correo electrónico válido'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres para ser segura'
  }),
  isAdmin: Joi.boolean()
});

// MIDDLEWARES DE VALIDACIÓN
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Error de validación", details: error.details[0].message });
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Error de seguridad en datos", details: error.details[0].message });
  next();
};

module.exports = { validateProduct, validateUser };