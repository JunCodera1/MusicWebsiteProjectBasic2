import { createContext, useState, useContext } from "react";

// Context cho âm thanh
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);

  // Hàm điều khiển phát/pause
  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
    } else {
      pauseSound();
    }
    setIsPaused(!isPaused);
  };

  // Hàm thay đổi bài hát
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    const sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
  };

  const playSound = () => {
    if (soundPlayed) soundPlayed.play();
  };

  const pauseSound = () => {
    if (soundPlayed) soundPlayed.pause();
  };

  return (
    <AudioContext.Provider
      value={{
        isPaused,
        togglePlayPause,
        changeSong,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
