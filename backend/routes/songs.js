import express from "express";
import { User } from "../model/user.js";
import { Song, validate } from "../model/song.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validObjectId from "../middleware/validObjectId.js";

const router = express.Router();

// Create song
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const song = await Song(req.body).save();
  res.status(201).send({ data: song, message: "Song created successfully" });
});
