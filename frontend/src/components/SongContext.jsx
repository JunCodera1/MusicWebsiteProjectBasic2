import { createContext, useState, useRef } from "react";
import { Howl } from "howler";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const soundRef = useRef(null); // Keep Howl instance persistent

  const playSong = (song) => {
    // Check if the same song is already playing
    if (soundRef.current && soundRef.current._src === song.track) {
      soundRef.current.play();
      return;
    }

    // Stop the previous song if a different one is selected
    if (soundRef.current) {
      soundRef.current.stop();
    }

    soundRef.current = new Howl({
      src: [song.track],
      html5: true,
    });

    setCurrentSong(song);
    soundRef.current.play();
  };

  const pauseSong = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playSong,
        pauseSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongContext;
