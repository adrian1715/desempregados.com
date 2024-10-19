const mongoose = require("mongoose");

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
    image: {
      url: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
  },
  introduction: {
    text: {
      type: String,
      required: true,
    },
  },
  educationAndSkills: {
    description: {
      type: String,
      required: true,
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
    image: {
      url: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
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
    image: {
      url: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
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

// Pre-save middleware to update the `updatedAt` field
careerPageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CareerPage = mongoose.model("CareerPage", careerPageSchema);

module.exports = CareerPage;
