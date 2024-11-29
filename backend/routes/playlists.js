import express from "express";

import mongoose from "mongoose";

import { Playlist } from "../model/playlist.js";
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
  passport.authenticate("jwt", { session: false }), // Passport JWT strategy
  async (req, res) => {
    const currentUser = req.user; // Should be populated by passport
    const { name, thumbnail, songs } = req.body;

    if (!name || !thumbnail || !songs) {
      return res.status(400).send({ err: "Insufficient data" });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collabrators: [],
    };

    try {
      const playlist = await Playlist.create(playlistData);
      return res.status(200).send(playlist);
    } catch (error) {
      console.error("Error creating playlist:", error);
      return res.status(500).send({ err: "Failed to create playlist" });
    }
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
    const { playlistId } = req.params;

    try {
      // Tìm playlist theo _id và trả về nếu tìm thấy
      const playlist = await Playlist.findById(playlistId);

      if (!playlist) {
        // Nếu không tìm thấy playlist, trả về lỗi 404
        return res.status(404).json({ error: "Playlist not found" });
      }

      // Trả về thông tin playlist nếu tìm thấy
      return res.status(200).json(playlist);
    } catch (error) {
      // Nếu có lỗi trong quá trình truy vấn, trả về lỗi 500
      console.error(error); // Log lỗi để dễ dàng debug
      return res.status(500).json({ error: "Server error" });
    }
  }
);

router.put(
  "/put/:playlistName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { playlistName } = req.params;

    try {
      // Tìm playlist theo tên (có thể thêm nhiều điều kiện khác như _id để đảm bảo tính duy nhất)
      const updatedPlaylist = await Playlist.findOneAndUpdate(
        { name: playlistName },
        { $set: req.body },
        { new: true } // Trả về playlist đã cập nhật
      );

      if (!updatedPlaylist) {
        return res.status(404).send({ message: "Playlist not found" });
      }

      return res.status(200).send({
        data: updatedPlaylist,
        message: "Playlist updated successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    }
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

router.put(
  "/put/edit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      // Find the playlist by ID
      const updatedPlaylist = await Playlist.findOneAndUpdate(
        { _id: id }, // Match by playlist ID
        { $set: req.body }, // Update the playlist fields with the body of the request
        { new: true } // Return the updated document
      );

      // Check if the playlist exists
      if (!updatedPlaylist) {
        return res.status(404).send({ message: "Playlist not found" });
      }

      // Check if the authenticated user is the owner of the playlist
      const user = await User.findById(req.user._id);
      if (!user._id.equals(updatedPlaylist.user)) {
        return res
          .status(403)
          .send({ message: "You are not authorized to edit this playlist" });
      }

      // Return the updated playlist
      return res.status(200).send({
        data: updatedPlaylist,
        message: "Playlist updated successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
);

// Add a song to a playlist
router.post(
  "/add/song/:playlistId/:songId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { playlistId, songId } = req.params;

      // Step 0: Check if playlistId and songId are valid ObjectIds
      if (
        !mongoose.Types.ObjectId.isValid(playlistId) ||
        !mongoose.Types.ObjectId.isValid(songId)
      ) {
        return res.status(400).json({ error: "Invalid playlist or song ID" });
      }

      // Step 1: Get the playlist if valid
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist does not exist" });
      }

      // Step 2: Check if currentUser owns the playlist or is a collaborator
      if (
        !playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
      ) {
        return res
          .status(403)
          .json({ error: "You are not allowed to modify this playlist" });
      }

      // Step 3: Check if the song is a valid song
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ error: "Song does not exist" });
      }

      // Step 4: Avoid duplicate entries in the playlist
      if (playlist.songs.includes(songId)) {
        return res
          .status(400)
          .json({ error: "Song already exists in the playlist" });
      }

      // Step 5: Add the song to the playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res
        .status(200)
        .json({ message: "Song added successfully", playlist });
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

// Remove song from playlist
router.put("/put/remove-song", auth, async (req, res) => {
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

router.get("/get/favourite", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlists = await Playlist.find({ _id: user.playlists });
  res.status(200).send({ data: playlists });
});

// Get random playlist
router.get("/get/random", auth, async (req, res) => {
  const playlists = await Playlist.aggregate([{ $sample: { size: 10 } }]);
  res.status(200).send({ data: playlists });
});

// Get all playlists
router.get("/get", auth, async (req, res) => {
  const playlists = await Playlist.find();
  res.status(200).send({ data: playlists });
});

// Delete playlist by id
router.delete("/delete/:id", [validObjectId, auth], async (req, res) => {
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
