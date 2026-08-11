import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    temperatureUnit: {
      type: String,
      default: "C",
    },

    language: {
      type: String,
      default: "en",
    },

    notification: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Settings", settingsSchema);
