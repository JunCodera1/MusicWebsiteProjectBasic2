import React, { useContext, useState } from "react";
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

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];
const menuItemsRight = [{ label: "Profile", uri: "/" }];

const LoggedInContainer = ({ children }) => {
  const { currentSong, setCurrentSong } = useContext(SongContext); // Sử dụng useContext
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  // Function to handle the play/pause toggle
  const togglePlayPause = () => {
    if (soundPlayed) {
      if (isPaused) {
        soundPlayed.play(); // Play the sound if paused
        setIsPaused(false); // Update state
      } else {
        soundPlayed.pause(); // Pause the sound if playing
        setIsPaused(true); // Update state
      }
    } else {
      playSound(currentSong.track); // Initialize and play sound if not set
    }
  };

  // Function to initialize and play the sound
  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop(); // Stop the previous sound if any
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
      preload: true,
      loop: true,
    });
    setSoundPlayed(sound); // Store the sound instance
    sound.play(); // Play the sound immediately
    setIsPaused(false); // Set paused state to false as sound is playing
  };

  console.log("Current Song:", currentSong);

  return (
    <Box className="w-full h-9/10">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
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

          <div className="w-1/4 flex items-center justify-end">HI</div>
        </Box>
      )}
    </Box>
  );
};

export default LoggedInContainer;
