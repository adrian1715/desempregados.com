const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    CPF: {
      type: String,
      required: true,
      match: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, // regex validation
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
    },
    phone: {
      type: String,
      required: true,
      match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    registeredOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
