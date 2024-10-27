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

export default router;
