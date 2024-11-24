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
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại
  const [duration, setDuration] = useState(() => {
    // Lấy duration từ localStorage nếu có
    return parseFloat(localStorage.getItem("songDuration") || 0);
  });

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

  // Log giá trị currentTimeRef khi nó thay đổi
  useEffect(() => {
    console.log(currentTimeRef.current);
  }, [currentTime]); // Log khi currentTime thay đổi

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
    <Box className="w-full" minH="100vh" display="flex" flexDirection="column">
      <Navbar menuItemsLeft={menuItemsLeft} />
      <Box display="flex" minH="100vh" position="relative" gap={4}>
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
          height="100%"
        >
          <Box p={4}>{children}</Box>
        </Box>
      </Box>
      {currentSong && (
        <Box
          width="full"
          height={{ base: "60px", md: "80px" }} // Thay đổi chiều cao tùy kích thước màn hình
          bg="#0F0616"
          className="bg-opacity-30 items-center px-4"
          color="white"
          display="flex"
          position="sticky"
          top={0}
          zIndex={10}
          px={{ base: 2, md: 4 }} // Thay đổi padding ngang
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex items-center">
            <Image
              src={currentSong.thumbnail}
              className="h-auto w-full max-w-[50px] md:max-w-[30px] lg:max-w-[70px] rounded-full"
            />
            <div className="pl-4 w-4/5 space-y-1">
              <div className="text-xs sm:text-[10px] md:text-[13px] lg:text-sm hover:underline truncate">
                {currentSong ? currentSong.name : "No song selected"}
              </div>
              <div className="text-xs sm:text-[10px] md:text-xs lg:text-sm text-gray-500 hover:underline">
                {currentSong && currentSong.artist
                  ? currentSong.artist.username
                  : "Unknown Artist"}
              </div>
            </div>

            {/* Hiển thị thời gian phát */}
            <div className="w-full  justify-center mt-4 hidden sm:flex">
              <span className="text-sm text-white sm:text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center items-center px-4 ">
            <div
              className="flex justify-between items-center w-[90%] md:w-2/3 lg:w-1/2"
              style={{ zIndex: 10 }}
            >
              {/* Các nút khác sẽ bị ẩn trên màn hình nhỏ */}
              <FaShuffle
                className="hidden sm:block text-gray-500 hover:text-white text-md"
                size={24}
              />
              <MdOutlineSkipPrevious
                className="hidden sm:block text-gray-500 hover:text-white text-2xl"
                size={32}
              />

              {/* Hiển thị nút Play/Pause trên mọi kích thước */}
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
                className="hidden sm:block text-gray-500 hover:text-white text-2xl"
                size={32}
              />
              <FaRepeat
                className="hidden sm:block text-gray-500 hover:text-white text-md"
                size={24}
              />
            </div>
          </div>

          <div className="w-1/4 flex items-center justify-end space-x-4 hidden sm:flex">
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
