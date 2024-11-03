import mongoose from "mongoose";
import joi from "joi";

// Create song schema
const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  track: { type: String, required: true },
  artist: { type: String, required: true },
  duration: { type: Number, required: true },
});

// Validate song
const validate = (song) => {
  const schema = joi.object({
    name: joi.string().required(),
    thumbnail: joi.string().required(),
    track: joi.string().required(),
    artist: joi.string().required(),
    duration: joi.number().required(),
  });
  return schema.validate(song);
};

// Create song model
const Song = mongoose.model("song", songSchema);

export { Song, validate };
