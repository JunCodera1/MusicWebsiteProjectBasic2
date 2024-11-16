import React, { useContext, useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
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
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];

const LoggedInContainer = ({ children }) => {
  Howler.autoUnlock = true; // Cho phép Howler tự động mở khóa âm thanh khi có tương tác
  Howler.html5PoolSize = 10; // Tăng giới hạn pool nếu cần
  const { currentSong, setCurrentSong } = useContext(SongContext);
  const [isPaused, setIsPaused] = useState(true);
  const soundRef = useRef(null); // Ref to persist the Howl instance
  const currentSongRef = useRef(null); // Ref to track the currently playing song

  // Play or pause the music
  const togglePlayPause = () => {
    if (isPaused) {
      // Resume AudioContext if it's suspended
      if (
        soundRef.current.context &&
        soundRef.current.context.state === "suspended"
      ) {
        soundRef.current.context.resume();
      }
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  // Change the song without stopping the sound
  const changeSong = (songSrc) => {
    if (soundRef.current) {
      // Nếu bài hát hiện tại giống bài hát yêu cầu, không phát chồng
      if (soundRef.current._src === songSrc && soundRef.current.playing()) {
        return;
      }
      soundRef.current.stop(); // Dừng bài hát hiện tại
    }

    soundRef.current = new Howl({
      src: [songSrc],
      html5: true,
    });

    soundRef.current.play(); // Phát bài hát mới
  };

  useEffect(() => {
    if (!currentSong) return;

    // Only change the song if currentSong.track is different from the current playing song
    changeSong(currentSong.track);
  }, [currentSong]);

  // Initialize and play the sound
  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  // Pause the sound
  const pauseSound = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  return (
    <Box className="w-full h-9/10">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
      <Box display="flex" minH="100vh" position="relative">
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
