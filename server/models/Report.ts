import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["road", "lighting", "garbage", "other"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    location: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", ReportSchema);