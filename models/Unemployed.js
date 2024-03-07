const mongoose = require("mongoose");
const { Schema } = mongoose;

const unemployedSchema = new Schema({
  name: {
    type: String,
    required: ["Unemployed must have a name."],
  },
  email: {
    type: String,
    required: [true, "Unemployed must have an email address."],
    match: [
      /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
      "Invalidate email address.",
    ],
  },
  password: {
    String,
    required: [true, "Unemployed must have a password."],
  },
  appliedOffers: Array,
});

const Unemployed = mongoose.model("Unemployed", unemployedSchema);

module.exports = Unemployed;
