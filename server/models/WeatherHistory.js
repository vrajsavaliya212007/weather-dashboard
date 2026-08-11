import mongoose from "mongoose";

const weatherHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
    },

    pressure: {
      type: Number,
    },

    windSpeed: {
      type: Number,
    },

    weather: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

weatherHistorySchema.index(
  {
    user: 1,
    city: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("WeatherHistory", weatherHistorySchema);
