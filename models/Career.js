const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const careerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

const Career = model("Career", careerSchema);

module.exports = Career;
