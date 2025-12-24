const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Relación con el modelo User
      required: false,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Product', productSchema);