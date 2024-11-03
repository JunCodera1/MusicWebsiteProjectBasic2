import express from "express";

import { Playlist, validate } from "../model/playlist.js";
import { User } from "../model/user.js";
import { Song } from "../model/song.js";

import auth from "../middleware/auth.js";
import validObjectId from "../middleware/validObjectId.js";
import passport from "passport";

import Joi from "joi";

const router = express.Router();

// Route 1: Create playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).send({ err: "Insufficient data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collabrators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).send(playlist);
  }
);

// Route 2: Get a playlist by ID
// we will get the playlist ID as a route parameter and we will return teh playlist having that id
// /something1/something2/something3 --> exact match
// /something1/something2/something4 --> this will not call the api on the previus line
// If we are doing /playlist/get/:playlistId (focus on teh :) --> this means that playlistId is now a variable to which we can assign any value
// If you call anything of the format /playlist/get/asdvniuen (asdvniuen can be anything), this api is called
// If you called /playlist/get/asdvniuen, the playlistId variable gets assigned teh value asdvniuen.
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // This concept is called req.params
    const playlistId = req.params.playlistId;
    // I need to find a playlist with the _id = playlistId
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

// Get all playlists made by me
// /get/me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

// Get all playlists made by an artist
// /get/artist/xyz
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    // We can do this: Check if artist with given artist Id exists
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ err: "Invalid Artist ID" });
    }

    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

// Edit playlists by ID
router.put("/edit/:id", [validObjectId, auth], async (req, res) => {
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

  // Add song to playlist
  router.put("/add-song", auth, async (req, res) => {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);

    if (!user._id.equals(playlist.user)) {
      return res
        .status(403)
        .send({ message: "You are not authorized to edit this playlist" });
    }

    if (playlist.songs.indexOf(req.body.songId) === -1) {
      playlist.songs.push(req.body.songId);
    }
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Song added to playlist" });
  });
});

// Remove song from playlist
router.put("/remove-song", auth, async (req, res) => {
  const schema = Joi.object({
    playlistId: Joi.string().required(),
    songId: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  if (!user._id.equals(playlist.user)) {
    return res
      .status(403)
      .send({ message: "You are not authorized to edit this playlist" });
  }
  const index = playlist.songs.indexOf(req.body.songId);
  playlist.songs.splice(index, 1);
  await playlist.save();
  res
    .status(200)
    .send({ data: playlist, message: "Song removed from playlist" });
});

// User favourite playlist

router.get("/favourite", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlists = await Playlist.find({ _id: user.playlists });
  res.status(200).send({ data: playlists });
});

// Get random playlist
router.get("/random", auth, async (req, res) => {
  const playlists = await Playlist.aggregate([{ $sample: { size: 10 } }]);
  res.status(200).send({ data: playlists });
});

// Get all playlists
router.get("/", auth, async (req, res) => {
  const playlists = await Playlist.find();
  res.status(200).send({ data: playlists });
});

// Delete playlist by id
router.delete("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    return res.status(404).send({ message: "Playlist not found" });
  }

  if (!user._id.equals(playlist.user)) {
    return res
      .status(403)
      .send({ message: "You are not authorized to edit this playlist" });
  }

  const index = user.playlists.indexOf(req.params.id);
  if (index !== -1) {
    user.playlists.splice(index, 1);
    await user.save();
  }

  await playlist.deleteOne();
  res.status(200).send({ data: playlist, message: "Playlist deleted" });
});

export default router;
