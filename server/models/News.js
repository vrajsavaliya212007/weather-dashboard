import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "Unknown",
    },

    author: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "weather",
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("News", newsSchema);
