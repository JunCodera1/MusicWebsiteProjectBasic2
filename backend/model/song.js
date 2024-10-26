const mongoose = require("mongoose");
const joi = require("joi");

const songSchema = new mongoose.Schema({
  name: { type: String, require: true },
  artist: { type: String, require: true },
  song: { type: String, require: true },
  image: { type: String, require: true },
  duration: { type: Number, require: true },
});

const validate = (song) => {
  const schema = joi.object({
    name: joi.string().required(),
    artist: joi.string().required(),
    song: joi.string().required(),
    image: joi.string().required(),
    duration: joi.number().required(),
  });
  return schema.validate(song);
};

const Song = mongoose.model("song", songSchema);
module.exports = { Song, validate };
