import express from "express";
import { Song } from "../model/song";
import { Playlist } from "../model/playlist";
import auth from "../middleware/auth";

router.get("/", auth, async (req, res) => {
  const { search } = req.query.search;
  if (search !== "") {
    const songs = await Song.find({
      name: { $regex: search, options: "i" },
    }).limit(10);
    const playlists = await Play.find({
      name: { $regex: search, options: "i" },
    }).limit(10);
    const result = { songs, playlists };
    res.status(200).send({ data: result });
  } else {
    res.status(200).send({});
  }
});
