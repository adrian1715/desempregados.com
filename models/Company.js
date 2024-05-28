const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    CNPJ: {
      String,
      required: true,
      match: /^\d{2}\.?\d{3}\.?\d{3}\/?0001-?\d{2}$/,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, // regex validation
    },
    password: {
      type: String,
      required: true,
    },
    appliedOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("Company", userSchema);

module.exports = User;
