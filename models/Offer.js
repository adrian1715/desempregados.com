const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    candidates: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
