// models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    serviceOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    serviceRequested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
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
      enum: ['pendiente', 'aceptado', 'rechazado', 'completado'],
      default: 'pendiente',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

// Exportar el modelo
module.exports = mongoose.model('Trade', tradeSchema);