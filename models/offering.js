const mongoose = require("mongoose");

const offeringSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del servicio es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offering", offeringSchema);