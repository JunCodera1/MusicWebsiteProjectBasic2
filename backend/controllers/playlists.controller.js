import mongoose from "mongoose";

import { Playlist } from "../model/playlist.model.js";
import { User } from "../model/user.model.js";
import { Song } from "../model/song.model.js";

import passport from "passport";

import Joi from "joi";

export const createPlaylist = async (req, res) => {
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
};

export const getPlaylistById = async (req, res) => {
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
};

export const updatePlaylistById = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // Tìm playlist theo tên (có thể thêm nhiều điều kiện khác như _id để đảm bảo tính duy nhất)
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { name: playlistId },
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
};

export const getPlaylistCurrentUser = async (req, res) => {
  const artistId = req.user._id;

  const playlists = await Playlist.find({ owner: artistId }).populate("owner");
  return res.status(200).json({ data: playlists });
};

export const getPlaylistByArtistId = async (req, res) => {
  const artistId = req.params.artistId;

  // We can do this: Check if artist with given artist Id exists
  const artist = await User.findOne({ _id: artistId });
  if (!artist) {
    return res.status(304).json({ err: "Invalid Artist ID" });
  }

  const playlists = await Playlist.find({ owner: artistId });
  return res.status(200).json({ data: playlists });
};

export const addSongToPlaylist = async (req, res) => {
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
};

export const getPlaylistByName = async (req, res) => {
  const { playlistName } = req.params;

  try {
    const playlists = await Playlist.find({
      name: { $regex: playlistName, $options: "i" }, // "i" là tùy chọn để tìm kiếm không phân biệt chữ hoa chữ thường
    }).populate("_id");

    return res.status(200).json({ data: playlists });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error searching playlists" });
  }
};
