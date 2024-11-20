import React, { useState } from "react";
import Scroll from "../components/Search/Scroll";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

function SearchPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSong = async () => {
    try {
      setLoading(true);
      const response = await makeAuthenticatedGETRequest(
        `/song/get/songname/${searchText}`
      );
      setSongData(response.data || []);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);

    if (inputValue.trim() === "") {
      setSongData([]); // Clear song data
    } else {
      await searchSong(); // Trigger search
    }
  };

  return (
    <LoggedInContainer>
      <section className="garamond">
        <div className="navy georgia ma0 grow">
          <h2 className="f2">Search your music</h2>
        </div>
        <div className="pa2">
          <input
            className="placeholder-red-500 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search Songs"
            onChange={handleChange}
            style={{
              color: "black",
              boxShadow: isInputFocused
                ? "0 0 10px rgba(0, 0, 0, 0.2)"
                : "none",
            }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        <div>
          {loading ? (
            <div className="text-gray-400 pt-10">Loading...</div>
          ) : songData.length > 0 ? (
            <Scroll>
              {songData.map((song) => (
                <SingleSongCard
                  key={song.id}
                  info={song}
                  playSound={() => console.log(`Playing ${song.name}`)}
                />
              ))}
            </Scroll>
          ) : (
            <div className="text-gray-400 pt-10">Nothing to show here.</div>
          )}
        </div>
      </section>
    </LoggedInContainer>
  );
}

export default SearchPage;
