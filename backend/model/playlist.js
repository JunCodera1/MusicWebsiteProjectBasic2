import mongoose from "mongoose";
import joi from "joi";

const ObjectId = mongoose.Schema.Types.ObjectId;

// Create playlist schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, require: true },
  thumbnail: { type: String },
  owner: { type: ObjectId, ref: "user", require: true },
  songs: { type: Array, default: [] },
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  desc: { type: String },
});

// Validate playlist
const validate = (playlist) => {
  const schema = joi.object({
    name: joi.string().required(),
    thumbnail: joi.string(),
    owner: joi.string().required(),
    songs: joi.array().items(joi.string()),
    collaborators: joi.array().items(joi.string()),
    desc: joi.string().allow(""),
  });
  return schema.validate(playlist);
};
// Create playlist model
const Playlist = mongoose.model("playlist", playlistSchema);

export { Playlist, validate };
