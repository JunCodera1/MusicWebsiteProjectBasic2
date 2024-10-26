import mongoose from "mongoose";
import joi from "joi";

const ObjectId = mongoose.Schema.Types.ObjectId;

// Create playlist schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, require: true },
  user: { type: ObjectId, ref: "user", require: true },
  desc: { type: String },
  songs: { type: Array, default: [] },
  image: { type: String },
});

// Validate playlist
const validate = (playlist) => {
  const schema = joi.object({
    name: joi.string().required(),
    user: joi.string().required(),
    desc: joi.string().allow(""),
    songs: joi.array().items(joi.string()),
    image: joi.string(),
  });
  return schema.validate(playlist);
};
// Create playlist model
const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = { Playlist, validate };
