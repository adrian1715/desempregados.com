const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    type: {
      type: String,
      enum: ["Company", "Unemployed"],
      required: true,
    },

    // if it's an unemployed
    registeredJobOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],

    // if it's a company
    appliedJobOffers: [
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
