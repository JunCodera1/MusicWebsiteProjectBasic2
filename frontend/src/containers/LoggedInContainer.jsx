import React, { useState } from "react";
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

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];

const LoggedInContainer = ({ children }) => {
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
      playSound(
        "https://res.cloudinary.com/da8vrvx03/video/upload/v1731389834/grvpzwch4pazl34eiewl.mp4"
      ); // Initialize and play sound if not set
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

  return (
    <Box className="w-full">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
      <Box display="flex" minH="100vh" position="relative">
        {/* Sidebar */}
        <Box
          width={{ base: "70px", md: "250px" }}
          bg={useColorModeValue("white", "gray.800")}
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
          <Box p={4}>{children}</Box>
        </Box>
      </Box>

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
            src="https://i1.sndcdn.com/artworks-000079325950-c0pvul-t500x500.jpg"
            className="h-20 w-20"
          />
          <div className="pl-4">
            <div className="text-md hover:underline">Nothing Lasts</div>
            <div className="text-sm text-gray-500 hover:underline">Bedroom</div>
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
    </Box>
  );
};

export default LoggedInContainer;
