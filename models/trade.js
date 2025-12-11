const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema(
  {
    serviceOffered: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Service', // Servicio que ofrece el usuario A
    },
    serviceRequested: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Service', // Servicio que solicita el usuario B
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Los dos usuarios involucrados en el intercambio
      },
    ],
    status: {
      type: String,
      enum: ['Pendiente', 'Aceptado', 'Completado', 'Cancelado'],
      default: 'Pendiente',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // añade createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Trade', tradeSchema);