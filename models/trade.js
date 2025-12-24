// models/trade.js
const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema(
  {
    serviceOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offering',
      required: true,
    },
    serviceRequested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offering',
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ['pendiente', 'aceptado', 'rechazado'],
      default: 'pendiente',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trade', tradeSchema);