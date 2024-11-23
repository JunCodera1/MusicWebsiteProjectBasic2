// SinglePlaylistCard.jsx
import React from "react";
import SingleSongCard from "./SingleSongCard"; // Assuming you have this component for songs

const SinglePlaylistCard = ({ playlist }) => {
  return (
    <div className="playlist-card bg-gray-800 p-4 rounded-lg">
      <div className="playlist-header flex justify-between items-center">
        <div className="playlist-name text-white text-xl font-semibold">
          {playlist.name}
        </div>
        <div className="playlist-desc text-gray-400">
          {playlist.desc || "No description available"}
        </div>
      </div>

      <div className="songs-list pt-5">
        {playlist.songs.length > 0 ? (
          playlist.songs.map((song) => (
            <SingleSongCard key={song._id} info={song} onPlay={() => {}} />
          ))
        ) : (
          <div className="text-white">No songs in this playlist</div>
        )}
      </div>
    </div>
  );
};

export default SinglePlaylistCard;
