const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    terms: {
      type: String,
      required: [true, 'Los términos son obligatorios'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'closed', 'cancelled'],
      default: 'draft',
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

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
