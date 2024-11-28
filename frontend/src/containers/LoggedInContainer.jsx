import React, { useContext, useState, useRef, useLayoutEffect, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { Howl } from "howler";
import Navbar from "../components/Navbar";
import { FaVolumeUp, FaVolumeMute, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import SongContext from "@/components/SongContext";
import { Slider } from "@/components/ui/slider";
import ShuffleIcon from "@/assets/icons/shuffle.svg";
import RedoIcon from "@/assets/icons/redo.svg";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];

const LoggedInContainer = ({ children }) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(SongContext);

  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentTimeRef = useRef(0);
  const finalVolume = muted ? 0 : volume;

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundPlayed && soundPlayed.playing()) {
        const currentSeek = soundPlayed.seek();
        currentTimeRef.current = currentSeek;
        setCurrentTime(currentSeek);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [soundPlayed]);

  useLayoutEffect(() => {
    if (currentSong && (!soundPlayed || soundPlayed._src !== currentSong.track)) {
      if (soundPlayed && soundPlayed.playing()) {
        soundPlayed.stop();
      }
      changeSong(currentSong.track);
    }
  }, [currentSong, soundPlayed]);

  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.volume(finalVolume);
    }
  }, [finalVolume, soundPlayed]);

  const changeSong = (songSrc) => {
    if (!songSrc) return;
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      volume: finalVolume,
      onplay: () => setDuration(sound.duration()),
      onend: () => setCurrentTime(0),
    });

    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    if (isPaused) {
      soundPlayed?.play();
      setIsPaused(false);
    } else {
      soundPlayed?.pause();
      setIsPaused(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box className="w-full min-h-screen flex flex-col">
      <Navbar menuItemsLeft={menuItemsLeft} />
      <Box className="flex flex-1 relative gap-4">
        <Box
          width={{ base: "70px", md: "250px" }}
          bg={useColorModeValue("gray.100", "gray.800")}
          className="flex-shrink-0"
        >
          <Sidebar />
        </Box>
        <Box className="flex-1 flex flex-col overflow-y-auto">
          <Box p={4}>{children}</Box>
        </Box>
      </Box>
      {currentSong && (
        <Box className="fixed bottom-0 left-0 right-0 w-full h-20 bg-[#18181c] text-white flex flex-col z-10">
          <Slider
            value={[Math.floor((currentTime / duration) * 100) || 0]}
            max={100}
            step={1}
            className="w-full cursor-pointer [&>span]:h-1 [&>span]:bg-[#ffffff1a] [&_[role=slider]]:h-1 [&_[role=slider]]:w-1 [&_[role=slider]]:border-none [&>span:first-child_span]:bg-[#1ed760]"
          />
          <Box className="flex justify-between items-center px-4 h-[calc(100%-4px)]">
            <Box className="flex items-center gap-4 w-1/3">
              <Image src={currentSong.thumbnail} alt="Thumbnail" className="w-14 h-14 object-cover" />
              <Box>
                <div className="text-sm font-medium truncate">{currentSong.name || "No song selected"}</div>
                <div className="text-xs text-gray-400">{currentSong.artist?.username || "Unknown Artist"}</div>
              </Box>
            </Box>
            <Box className="flex items-center gap-6 w-1/3 justify-center">
              <img src={ShuffleIcon} alt="Shuffle" className="text-[#b3b3b3] hover:text-white cursor-pointer w-4 h-4" />
              <MdOutlineSkipPrevious className="text-[#b3b3b3] hover:text-white cursor-pointer" size={24} />
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
              <MdOutlineSkipNext className="text-[#b3b3b3] hover:text-white cursor-pointer" size={24} />
              <img src={RedoIcon} alt="Redo" className="text-[#b3b3b3] hover:text-white cursor-pointer w-4 h-4" />
            </Box>
            <Box className="flex items-center gap-2 w-1/3 justify-end">
              <button onClick={() => setMuted(!muted)} className="text-[#b3b3b3] hover:text-white">
                {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
              <Slider
                defaultValue={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0] / 100)}
                className="w-24 cursor-pointer [&>span]:h-1 [&>span]:bg-white/20 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-none [&>span:first-child_span]:bg-white"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoggedInContainer;

