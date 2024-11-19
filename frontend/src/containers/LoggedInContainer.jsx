import React, { useContext, useState, useRef, useLayoutEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";
import { Howl, Howler } from "howler";
import Navbar from "../components/Navbar";
import { FaShuffle } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import SongContext from "@/components/SongContext";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import icons for volume

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

  // Tính toán finalVolume với chế độ mute
  const finalVolume = muted ? 0 : volume;

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // Prevent first render logic
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (soundPlayed) {
      soundPlayed.volume(finalVolume);
    }

    if (!currentSong) {
      return;
    }
    // Don't change the song if the song is already playing
    if (soundPlayed && soundPlayed.playing()) {
      return; // Skip playing if already playing
    }

    changeSong(currentSong.track);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track, finalVolume]);

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop(); // Stop current song if any
    }

    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });

    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <Box className="w-full h-9/10">
      <Navbar menuItemsLeft={menuItemsLeft} />
      <Box display="flex" minH="100vh" position="relative">
        {/* Sidebar */}
        <Box
          width={{ base: "70px", md: "250px" }}
          bg={useColorModeValue("gray.100", "gray.800")}
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          overflowY="auto"
          height={"100vh"}
        >
          <Box p={4}>{children}</Box>
        </Box>
      </Box>
      {currentSong && (
        <Box
          width="full"
          height="full"
          bg={"#0F0616"}
          className="bg-opacity-30 items-center px-4"
          color={"white"}
          display={"flex"}
        >
          <div className="w-1/3 flex items-center">
            <Image
              src={currentSong.thumbnail}
              className="h-16 w-16"
              borderRadius={"full"}
            />
            <div className="pl-4">
              <div className="text-md hover:underline">
                {currentSong ? currentSong.name : "No song selected"}
              </div>
              <div className="text-sm text-gray-500 hover:underline">
                {currentSong && currentSong.artist
                  ? currentSong.artist.username
                  : "Unknown Artist"}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="flex w-2/6 justify-between items-center">
              <FaShuffle
                className="text-gray-500 hover:text-white text-md"
                size={24}
              />
              <MdOutlineSkipPrevious
                className="text-gray-500 hover:text-white text-2xl"
                size={32}
              />
              <div>
                {isPaused ? (
                  <FaPlayCircle
                    className="text-gray-500 hover:text-white text-2xl"
                    size={40}
                    onClick={togglePlayPause}
                  />
                ) : (
                  <FaCirclePause
                    className="text-gray-500 hover:text-white text-2xl"
                    size={40}
                    onClick={togglePlayPause}
                  />
                )}
              </div>
              <MdOutlineSkipNext
                className="text-gray-500 hover:text-white text-2xl"
                size={32}
              />
              <FaRepeat
                className="text-gray-500 hover:text-white text-md"
                size={24}
              />
            </div>
          </div>

          <div className="w-1/4 flex items-center justify-end space-x-4">
            {/* Biểu tượng âm thanh */}
            <button
              onClick={() => setMuted((prev) => !prev)}
              style={{ marginLeft: 10 }}
            >
              {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              onChange={(e) => setVolume(e.target.valueAsNumber)}
              style={{ marginLeft: 10 }}
            />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default LoggedInContainer;
