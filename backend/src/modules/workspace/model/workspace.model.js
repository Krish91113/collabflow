import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    visibility: {
      type: String,
      enum: ["PRIVATE", "PUBLIC"],
      default: "PRIVATE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Workspace", workspaceSchema);