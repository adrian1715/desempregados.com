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
  // add tags input to new career page template
  tags: [String],
});

// Add toJSON option to include virtuals when converting to JSON
careerPageSchema.set("toJSON", { virtuals: true });
careerPageSchema.set("toObject", { virtuals: true });

// Pre-save middleware to update the `updatedAt` field
careerPageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Post-save middleware to update the parent Career
careerPageSchema.post("save", async function (doc) {
  try {
    // Find the parent Career
    const career = await mongoose.model("Career").findById(doc.career);

    if (career) {
      // Check if this page is already in the career's pages array
      const pageExists = career.pages.some(
        (pageId) => pageId.toString() === doc._id.toString()
      );

      // If not, add it and save
      if (!pageExists) {
        career.pages.push(doc._id);
        await career.save();
      }
    }
  } catch (error) {
    console.error("Error updating parent Career:", error);
  }
});

// Pre-remove middleware to update the parent Career when a CareerPage is deleted
careerPageSchema.pre("findOneAndDelete", async function () {
  const docToDelete = await this.model.findOne(this.getFilter());
  if (docToDelete) {
    try {
      const career = await mongoose
        .model("Career")
        .findById(docToDelete.career);
      if (career) {
        career.pages = career.pages.filter(
          (pageId) => pageId.toString() !== docToDelete._id.toString()
        );
        await career.save();
      }
    } catch (error) {
      console.error("Error removing page from career: ", error);
    }
  }
});

const CareerPage = mongoose.model("CareerPage", careerPageSchema);

module.exports = CareerPage;
