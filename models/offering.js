const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;