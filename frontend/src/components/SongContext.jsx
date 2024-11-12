import { createContext } from "react";

const SongContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
});

export default SongContext;
