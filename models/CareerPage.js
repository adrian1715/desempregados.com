const mongoose = require("mongoose");

// Create a separate schema for images to add the virtual property
const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  filename: String,
  subtitle: {
    type: String,
    required: true,
  },
});

// Add the virtual property for thumbnails
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_250");
});

const careerPageSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Career",
    required: true,
  },
  header: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: ImageSchema, // Use the ImageSchema instead of an embedded object
  },
  introduction: {
    text: {
      type: String,
      required: true,
    },
  },
  educationAndSkills: {
    text: {
      type: String,
    },
    points: [
      {
        title: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    image: ImageSchema, // Use the ImageSchema instead of an embedded object
  },
  careerOpportunities: {
    text: [
      {
        type: String,
        required: true,
      },
    ],
  },
  futureTendencies: {
    text: [
      {
        type: String,
        required: true,
      },
    ],
  },
  challengesAndRewards: {
    text: [
      {
        type: String,
        required: true,
      },
    ],
    image: ImageSchema, // Use the ImageSchema instead of an embedded object
  },
  conclusion: {
    text: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
    },
  ],
});

// Add toJSON option to include virtuals when converting to JSON
careerPageSchema.set("toJSON", { virtuals: true });
careerPageSchema.set("toObject", { virtuals: true });

// Pre-save middleware to update the `updatedAt` field
careerPageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CareerPage = mongoose.model("CareerPage", careerPageSchema);

module.exports = CareerPage;
