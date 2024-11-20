import { createContext } from "react";

const SongContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
});

export default SongContext;
