import express from "express";
import { User } from "../model/user.js";
import { Song, validate } from "../model/song.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import passport from "passport";
import validObjectId from "../middleware/validObjectId.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // req.user getss the user because of passport.authenticate
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song." });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

// Get route to get all songs I have published.
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // We need to get all songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

// Get all songs
router.get("/", async (req, res) => {
  try {
    // Retrieve all songs from the database
    const songs = await Song.find();

    // Send a successful response with the songs data
    res.status(200).send({ data: songs });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res
      .status(500)
      .send({ message: "An error occurred while retrieving songs" });
  }
});

// Update song by id
router.put("/:id", [validObjectId, admin], async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }

  res.status(200).send({ data: song, message: "Song updated successfully" });
});

// Delete song by id
router.delete("/:id", [validObjectId, admin], async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }
  res.status(200).send({ data: song, message: "Song deleted successfully" });
});

// Like or unlike a song
router.put("/like/:id", [validObjectId, auth], async (req, res) => {
  try {
    // Find the song by ID
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send({ message: "Song not found" });
    }

    // Find the authenticated user
    const user = await User.findById(req.user._id);

    // Check if the song is already liked by the user
    const index = user.likedSongs.indexOf(song._id);
    let resMessage = ""; // Initialize resMessage here

    if (index === -1) {
      // If not liked, add the song to likedSongs
      user.likedSongs.push(song._id);
      resMessage = "Added to your liked songs";
    } else {
      // If already liked, remove the song from likedSongs
      user.likedSongs.splice(index, 1);
      resMessage = "Removed from your liked songs";
    }

    // Save the updated user document
    await user.save();

    // Send a response with the result message
    res.status(200).send({ message: resMessage });
  } catch (error) {
    // Handle any errors that may occur during the process
    res
      .status(500)
      .send({ message: "An error occurred while liking/unliking the song" });
  }
});

// get all liked songs
router.get("/like", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const songs = await Song.find({ _id: user.likedSongs });
  res.status(200).send({ data: songs });
});

export default router;
