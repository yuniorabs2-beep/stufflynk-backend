const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nombre obligatorio'],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Descripción obligatoria'],
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: [true, 'Precio obligatorio'],
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);