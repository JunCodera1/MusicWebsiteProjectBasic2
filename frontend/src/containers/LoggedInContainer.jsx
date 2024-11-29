import React, {
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
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
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import SongContext from "@/components/SongContext";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // I
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
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại
  const [duration, setDuration] = useState(() => {
    // Lấy duration từ localStorage nếu có
    return parseFloat(localStorage.getItem("songDuration") || 0);
  });
  const replaySong = () => {
    if (soundPlayed) {
      soundPlayed.stop(); // Stop the current song
      soundPlayed.seek(0); // Reset the current time to 0
      soundPlayed.play(); // Start playing the song from the beginning
    }
    setCurrentSong(currentSong); // This is to ensure that the current song state is set again (in case any state update is needed)
  };

  // Tính toán finalVolume với chế độ mute
  const finalVolume = muted ? 0 : volume;

  const firstUpdate = useRef(true);
  const currentTimeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundPlayed && soundPlayed.playing()) {
        const currentSeek = soundPlayed.seek();
        currentTimeRef.current = currentSeek; // Lưu giá trị vào ref
        setCurrentTime(currentSeek); // Cập nhật state
      }
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount hoặc soundPlayed thay đổi
  }, [soundPlayed]);

  useLayoutEffect(() => {
    // Prevent first render logic
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // Chỉ thay đổi bài hát nếu có bài hát mới
    if (
      currentSong &&
      (!soundPlayed || soundPlayed._src !== currentSong.track)
    ) {
      if (soundPlayed && soundPlayed.playing()) {
        soundPlayed.stop(); // Dừng bài hát cũ nếu đang phát
      }

      changeSong(currentSong.track);
    } else if (soundPlayed) {
      // Nếu bài hát giống bài hát cũ, chỉ thay đổi âm lượng
      soundPlayed.volume(finalVolume);
    }
  }, [currentSong, finalVolume]); // Trigger khi currentSong hoặc volume thay đổi

  const changeSong = (songSrc) => {
    // Tạo một đối tượng Howl mới và phát bài hát mới
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      volume: finalVolume,
      onplay: () => {
        setDuration(sound.duration()); // Đặt thời gian tổng khi bài hát bắt đầu
        updateCurrentTime(); // Bắt đầu cập nhật thời gian hiện tại
      },
      onend: () => {
        setCurrentTime(0); // Đặt lại thời gian khi bài hát kết thúc
      },
    });

    setSoundPlayed(sound); // Lưu sound vào state
    sound.play(); // Phát bài hát
    setIsPaused(false); // Bài hát đang phát, không tạm dừng
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

  useEffect(() => {
    // Lưu duration vào localStorage khi nó thay đổi
    if (duration) {
      localStorage.setItem("songDuration", duration);
    }
  }, [duration]);

  // Cập nhật thời gian hiện tại mỗi 100ms
  const updateCurrentTime = () => {
    if (soundPlayed && soundPlayed.playing()) {
      const currentSeek = soundPlayed.seek();
      if (currentSeek !== currentTimeRef.current) {
        setCurrentTime(currentSeek); // Chỉ cập nhật khi giá trị thay đổi
        currentTimeRef.current = currentSeek; // Cập nhật giá trị trong ref
      }
    }
    requestAnimationFrame(updateCurrentTime); // Gọi lại chính nó
  };

  // Bắt đầu cập nhật khi bài hát bắt đầu phát
  useEffect(() => {
    if (soundPlayed && soundPlayed.playing()) {
      updateCurrentTime(); // Gọi hàm ngay khi bài hát bắt đầu
    }
  }, [soundPlayed]); // Chỉ gọi lại khi soundPlayed thay đổi

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
            value={[Math.floor((currentTime / duration) * 100) || 0]} // Hiển thị vị trí thời gian bài hát
            max={100}
            step={1}
            onChange={(value) => {
              // Tính toán lại thời gian khi slider thay đổi
              const newTime = (value / 100) * duration;
              if (soundPlayed) {
                soundPlayed.seek(newTime); // Di chuyển bài hát đến thời điểm mới
                setCurrentTime(newTime); // Cập nhật thời gian hiện tại
              }
            }}
            className="w-full cursor-pointer [&>span]:h-1 [&>span]:bg-[#ffffff1a] [&_[role=slider]]:h-1 [&_[role=slider]]:w-1 [&_[role=slider]]:border-none [&>span:first-child_span]:bg-[#1ed760]"
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
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoggedInContainer;
