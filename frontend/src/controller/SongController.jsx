import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import ShuffleIcon from "@/assets/icons/shuffle.svg";
import RedoIcon from "@/assets/icons/redo.svg";
import { Slider } from "@/components/ui/slider";

const SongController = ({
  currentSong,
  currentTime,
  duration,
  soundPlayed,
  isPaused,
  togglePlayPause,
  replaySong,
  muted,
  setMuted,
  volume,
  setVolume,
}) => {
  return (
    <Box className="fixed bottom-0 left-0 right-0 w-full h-20 bg-[#18181c] text-white flex flex-col z-10">
      <Box className="flex justify-between px-4">
        <span></span>
      </Box>

      <Slider
        value={[Math.floor((currentTime / duration) * 100) || 0]} // Hiển thị vị trí thời gian bài hát
        max={100}
        step={1}
        onValueChange={(value) => {
          // Tính toán lại thời gian khi slider thay đổi
          const newTime = (value / 100) * duration;
          if (soundPlayed) {
            soundPlayed.seek(newTime); // Di chuyển bài hát đến thời điểm mới
            setCurrentTime(newTime); // Cập nhật thời gian hiện tại
          }
        }}
        className="w-full cursor-pointer [&>span]:h-1 [&>span]:bg-[#ffffff1a] [&_[role=slider]]:h-1 [&_[role=slider]]:w-1 [&_[role=slider]]:border-none [&>span:first-child_span]:bg-[#1ed760]"
        thumbLabel={true}
        thumbLabelFormatter={(value) => {
          const minutes = Math.floor(((value / 100) * duration) / 60);
          const seconds = Math.floor(((value / 100) * duration) % 60);
          return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }}
      />
      <Box className="flex justify-between items-center px-4 h-[calc(100%-4px)]">
        <Box className="flex items-center gap-4 w-1/3">
          <Image
            src={currentSong.thumbnail}
            alt="Thumbnail"
            className="w-14 h-14 object-cover"
          />
          <Box>
            <div className="text-sm font-medium truncate">
              {currentSong.name || "No song selected"}
            </div>
            <div className="text-xs text-gray-400">
              {currentSong.artist?.username || "Unknown Artist"}
            </div>
            <div className="text-xs text-gray-400">
              {Math.floor(currentTime / 60)}:
              {String(Math.floor(currentTime % 60)).padStart(2, "0")}/
              {Math.floor(duration / 60)}:
              {String(Math.floor(duration % 60)).padStart(2, "0")}
            </div>
          </Box>
        </Box>
        <Box className="flex items-center gap-6 w-1/3 justify-center">
          <img
            src={ShuffleIcon}
            alt="Shuffle"
            className="text-[#b3b3b3] hover:text-white cursor-pointer w-4 h-4"
          />
          <MdOutlineSkipPrevious
            className="text-[#b3b3b3] hover:text-white cursor-pointer"
            size={24}
          />
          <Box
            className="bg-white rounded-full p-2 hover:scale-105 transition cursor-pointer"
            onClick={togglePlayPause}
          >
            {isPaused ? (
              <FaPlayCircle className="text-black" size={24} />
            ) : (
              <FaPauseCircle className="text-black" size={24} />
            )}
          </Box>
          <MdOutlineSkipNext
            className="text-[#b3b3b3] hover:text-white cursor-pointer"
            size={24}
          />
          <img
            src={RedoIcon}
            alt="Redo"
            className="text-[#b3b3b3] hover:text-white cursor-pointer w-4 h-4"
            onClick={() => {
              replaySong();
              console.log(soundPlayed);
            }}
          />
        </Box>
        <Box className="flex items-center gap-2 w-1/3 justify-end">
          <button
            onClick={() => setMuted(!muted)}
            className="text-[#b3b3b3] hover:text-white"
          >
            {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
          <Slider
            defaultValue={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="w-24 cursor-pointer [&>span]:h-1 [&>span]:bg-white/20 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-none [&>span:first-child_span]:bg-white"
            thumbLabel={true}
            thumbLabelFormatter={(value) => {
              const minutes = Math.floor(((value / 100) * duration) / 60);
              const seconds = Math.floor(((value / 100) * duration) % 60);
              return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SongController;
