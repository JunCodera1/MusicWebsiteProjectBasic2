import express from "express";
import { Song } from "../model/song.js";
import { Playlist } from "../model/playlist.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const search = req.query.search || "";
  if (search !== "") {
    const songs = await Song.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);
    const playlists = await Playlist.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);
    const result = { songs, playlists };
    res.status(200).send({ data: result });
  } else {
    res.status(200).send({});
  }
});

export default router;
