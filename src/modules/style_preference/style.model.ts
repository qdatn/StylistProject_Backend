import mongoose, { Schema } from "mongoose";

const StylePreferenceSchema = new mongoose.Schema(
  {
    // 🧍 Personal Information

    occupation: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    height: {
      // in cm
      type: Number,
      min: 1,
      required: false,
    },
    weight: {
      // in kg
      type: Number,
      min: 1,
      required: false,
    },
    // bodyShape: {
    //   type: String,
    //   enum: [
    //     "hourglass",
    //     "rectangle",
    //     "triangle",
    //     "inverted_triangle",
    //     "round",
    //   ],
    //   required: false,
    // },

    // 🎨 Fashion Style Preferences
    favoriteStyles: {
      type: [String],
    //   enum: [
    //     "Active/Sporty",
    //     "Elegant",
    //     "Edgy",
    //     "Classic",
    //     "Minimalist",
    //     "Sexy",
    //     "Streetwear",
    //     "Vintage",
    //     "Y2K",
    //   ],
      default: [],
    },
    outfitsByOccasion: {
      type: Map,
      of: String,
      default: {},
    },
    followTrends: {
      type: String,
      enum: ["yes", "no", "sometimes"],
      required: false,
    },
    favoriteColors: {
      type: [String],
      default: [],
    },
    avoidedColors: {
      type: [String],
      default: [],
    },
    favoritePatterns: {
      type: [String],
      default: [],
    },

    // 🩳 Size & Fit Preferences
    topSize: {
      type: String,
      required: false,
    },
    bottomSize: {
      type: String,
      required: false,
    },
    shoeSize: {
      type: String,
      required: false,
    },
    fitPreference: {
      type: String,
      required: false,
    },
    avoidedStyles: {
      type: String,
      required: false,
    },

    // 🛍️ Shopping Habits
    shoppingPlaces: {
      type: [String],
      default: [],
    },
    shoppingFrequency: {
      type: String,
      required: false,
    },
    shoppingMethod: {
      type: String,
      required: false,
    },
    priorities: {
      type: [String],
      default: [],
    },

    // 📱 Interaction Channels
    platforms: {
      type: [String],
      default: [],
    },
    consentForAdvice: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const StylePreference = mongoose.model(
  "StylePreference",
  StylePreferenceSchema
);

export default StylePreference;
