const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const careerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
});

const Career = model("Career", careerSchema);

model.exports = Career;
