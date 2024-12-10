import mongoose from "mongoose";
import joi from "joi";

const ObjectId = mongoose.Schema.Types.ObjectId;

// Create playlist schema
const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String },
    owner: { type: ObjectId, ref: "User", required: true },
    songs: [
      {
        type: ObjectId,
        ref: "Song",
        default: [],
      },
    ],
    collaborators: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    desc: { type: String, default: "" },
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

// Validate playlist
const validate = (playlist) => {
  const schema = joi.object({
    name: joi.string().required(),
    thumbnail: joi.string(),
    owner: joi.string().required(),
    songs: joi.array().items(joi.string().required()), // Ensure each song ID is a valid string
    collaborators: joi.array().items(joi.string()),
    desc: joi.string().allow(""), // Optional empty string description
  });
  return schema.validate(playlist);
};

// Create playlist model
const Playlist = mongoose.model("Playlist", playlistSchema);

export { Playlist, validate };
