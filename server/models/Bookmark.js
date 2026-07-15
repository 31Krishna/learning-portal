import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    name: {
      type: String,
      default: "",
    },

    timestamp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bookmark", bookmarkSchema);