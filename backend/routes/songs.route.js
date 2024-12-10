import express from "express";

import passport from "passport";
import {
  createSong,
  deleteSongById,
  getAllSongs,
  getSongByArtistId,
  getSongById,
  getSongByName,
  getSongFeed,
  likeSong,
  unlikeSong,
  updateSongById,
} from "../controllers/songs.controller.js";

const router = express.Router();

// In your backend route definition
router.post(
  "/create",
  passport.authenticate("jwt-strategy-1", { session: false }), // Ensure this is correctly verifying the token
  createSong
);

// Get route to get all songs I have published.
// router.get(
//   "/get/mysongs",
//   passport.authenticate("jwt-strategy-1", { session: false }), // Kiểm tra token trước
//   getAllSongs
// );

// Get route to get all songs any artist has published
// I will send the artist id and I want to see all songs that artist has published.
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  getSongByArtistId
);

router.get(
  "/get/mysongs/:songId",
  passport.authenticate("jwt-strategy-1", { session: false }),
  getSongById
);

router.put(
  "/put/:songId",
  passport.authenticate("jwt-strategy-1", { session: false }),
  updateSongById
);

// Delete song by id
router.delete("/delete/song/:songId", deleteSongById);

// Get route to get a single song by name
router.get("/get/songname/:songName", getSongByName);

// Lấy tất cả bài hát mà người dùng đã thích (Feed)
router.get(
  "/get/feed",
  passport.authenticate("jwt-strategy-1", { session: false }), // Xác thực JWT
  getSongFeed
);

// Lấy tất cả bài hát của nhiều người dùng (cả bài hát của người dùng khác)
router.get("/get/allSongs", getAllSongs);

// Like a song

router.put("/put/like/:id", likeSong);

router.put("/put/unlike/:id", unlikeSong);

export default router;
