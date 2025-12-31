const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    itemOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offering',
      required: true,
    },
    itemRequested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
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