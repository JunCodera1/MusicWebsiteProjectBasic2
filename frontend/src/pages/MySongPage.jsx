import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SingleSongCard from "../components/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];

const SongPage = () => {
  const [songData, setSongData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        setSongData(response.data);
      } catch (err) {
        setError("Failed to fetch songs. Please try again later.");
        console.error("Error fetching songs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlay = (songId) => {
    console.log(`Playing song with id: ${songId}`);
    // Add your play logic here
  };

  const handleMoreOptions = (songId) => {
    console.log(`More options for song with id: ${songId}`);
    // Add your more options logic here
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
      <Box display="flex" minHeight="calc(100vh - 64px)" position="relative">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-white text-2xl font-semibold mb-6">My Songs</h1>
          {isLoading ? (
            <p className="text-white">Loading songs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : songData.length === 0 ? (
            <p className="text-white">No songs found.</p>
          ) : (
            <div className="space-y-4">
              {songData.map((song) => (
                <SingleSongCard
                  key={song._id}
                  info={song}
                  onPlay={() => handlePlay(song._id)}
                  onMoreOptions={() => handleMoreOptions(song._id)}
                />
              ))}
            </div>
          )}
        </main>
      </Box>
    </div>
  );
};

export default SongPage;
