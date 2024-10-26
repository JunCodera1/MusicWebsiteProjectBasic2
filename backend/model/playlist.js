const mongoose = require("mongoose");
const joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
  name: { type: String, require: true },
  user: { type: ObjectId, ref: "user", require: true },
  desc: { type: String },
  songs: { type: Array, default: [] },
  image: { type: String },
});

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
const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = { Playlist, validate };
