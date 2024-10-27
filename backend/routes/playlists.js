import express from "express";

import { Playlist, validate } from "../model/playlist.js";
import { User } from "../model/user.js";
import { Song } from "../model/song.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validObjectId from "../middleware/validObjectId.js";

import Joi from "joi";

const router = express.Router();

// Create playlist
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playlist = await Playlist({
    ...req.body,
    user: user._id,
  }).save();
  user.playlists.push(playlist._id);
  await user.save();

  res
    .status(201)
    .send({ data: playlist, message: "Playlist created successfully" });
});

// Edit playlists by ID
router.put("/:id", [validObjectId, auth], async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    desc: Joi.string().allow(""),
    image: Joi.string().allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user)) {
      return res
        .status(403)
        .send({ message: "You are not authorized to edit this playlist" });
    }

    // Update the playlist
    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    playlist.image = req.body.image;
    await playlist.save();

    res.status(200).send({ data: playlist, message: "Playlist updated" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while updating the playlist" });
  }
});

export default router;
