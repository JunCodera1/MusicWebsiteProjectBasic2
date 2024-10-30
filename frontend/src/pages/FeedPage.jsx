import React from "react";
import MusicCard from "../components/MusicCard";

const FeedPage = () => {
  const songs = [
    {
      image: "https://link-to-album-cover.jpg",
      title: "Song Title",
      artist: "Artist Name",
    },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {songs.map((song, index) => (
        <MusicCard
          key={index}
          image={song.image}
          title={song.title}
          artist={song.artist}
        />
      ))}
    </div>
  );
};

export default FeedPage;
