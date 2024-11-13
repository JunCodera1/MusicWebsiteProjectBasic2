import React, { useContext } from "react";
import { PlayCircle, MoreHorizontal } from "lucide-react";
import SongContext from "./SongContext";

const SingleSongCard = ({ info, onPlay, onMoreOptions, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(SongContext);
  return (
    <div
      className="flex items-center p-4 hover:bg-gray-700 rounded-xl transition duration-200 ease-in-out relative group"
      onClick={() => {
        setCurrentSong(info);
      }}
      style={{
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        width: "82vw",
      }}
    >
      <div className="relative">
        <div
          className="w-16 h-16 bg-cover bg-center rounded-md"
          style={{
            backgroundImage: `url(${info.thumbnail})`,
          }}
        ></div>
        <button
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={onPlay}
          aria-label={`Play ${info.name}`}
        >
          <PlayCircle className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="flex flex-col justify-center pl-4 flex-grow min-w-0">
        <div className="text-lg font-semibold text-white truncate hover:underline">
          {info.name}
        </div>
        <div className="text-sm text-gray-300 truncate hover:underline">
          {info.artist.username}
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="text-md text-gray-400">{info.duration || "6:14"}</div>
        <button
          className="text-gray-400 hover:text-white transition-colors duration-200"
          onClick={onMoreOptions}
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SingleSongCard;
