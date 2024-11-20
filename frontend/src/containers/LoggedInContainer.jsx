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

    // Only change the song if it's a new song
    if (
      currentSong &&
      (!soundPlayed || soundPlayed._src !== currentSong.track)
    ) {
      if (soundPlayed && soundPlayed.playing()) {
        soundPlayed.stop(); // Stop the previous song if any
      }

      changeSong(currentSong.track);
    } else if (soundPlayed) {
      // If the same song is playing, adjust the volume
      soundPlayed.volume(finalVolume);
    }
  }, [currentSong, finalVolume]); // Trigger on currentSong or volume change

  const changeSong = (songSrc) => {
    // Create a new Howl instance and play the new song
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      volume: finalVolume,
    });

    setSoundPlayed(sound); // Set the new sound to state
    sound.play(); // Play the song
    setIsPaused(false); // Song is playing, not paused
  };

  const playSound = () => {
    if (soundPlayed) {
      soundPlayed.play();
    }
  };

  const pauseSound = () => {
    if (soundPlayed) {
      soundPlayed.pause();
    }
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
