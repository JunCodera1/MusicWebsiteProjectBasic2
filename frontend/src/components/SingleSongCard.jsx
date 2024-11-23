import React, { useContext, useState, useEffect } from "react";
import { PlayCircle, MoreHorizontal } from "lucide-react";
import SongContext from "./SongContext";
import { Howl } from "howler";

// Helper function to format duration
const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  let seconds = durationInSeconds % 60;
  seconds = seconds.toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Function to trigger file download programmatically
const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SingleSongCard = ({ info, onPlay }) => {
  const { setCurrentSong } = useContext(SongContext);
  const [duration, setDuration] = useState(info.duration || null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    if (!info.duration) {
      const sound = new Howl({
        src: [info.track],
        html5: true,
      });

      sound.on("load", () => {
        setDuration(sound.duration());
        sound.unload();
      });
    }
  }, [info]);

  const formattedDuration = duration ? formatDuration(duration) : "Loading...";

  // Function to handle sharing
  const handleShare = () => {
    const shareData = {
      title: info.name,
      text: `Check out this awesome song by ${info.artist.username}!`,
      url: window.location.href, // Use the current page URL, or you can provide a specific song URL
    };

    if (navigator.share) {
      // For devices that support the Share API (mainly mobile)
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback: Open share in a new window (for desktops or unsupported devices)
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareData.url
      )}`;
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

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
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
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

      <div className="flex items-center gap-4 ml-auto relative">
        <div className="text-md text-gray-400">{formattedDuration}</div>
        <button
          className="text-gray-400 hover:text-white transition-colors duration-200 relative"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-2 bg-gray-800 text-white rounded shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  console.log(`Added ${info.name} to playlist`);
                  setMenuOpen(false);
                }}
              >
                Add to Playlist
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setModalOpen(true); // Open modal for download
                  setMenuOpen(false);
                }}
              >
                Download
              </li>
              {/* Share item */}
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={handleShare}
              >
                Share
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Modal for Download */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Download {info.name}</h2>
            <p className="text-sm mb-4">Do you want to download this song?</p>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              onClick={() => {
                downloadFile(info.track, info.name);
                setModalOpen(false); // Close the modal after download
                console.log(`Downloading ${info.name}`);
              }}
            >
              Download
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded ml-4"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSongCard;
