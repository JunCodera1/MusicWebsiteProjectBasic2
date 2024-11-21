import React, { useState, useEffect } from "react";
import TrackList from "../components/TrackList";
import SuggestedArtists from "../components/SuggestedArtists";
import Player from "../components/Player";
import Navbar from "@/components/Navbar";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];

export default function FeedPage() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tracks data
  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/tracks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError("Failed to load tracks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar menuItemsLeft={menuItemsLeft}></Navbar>
      <main className="flex-grow flex">
        <div className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-6">
            Hear the latest posts from the people you're following:
          </h1>

          {/* Hiển thị trạng thái loading hoặc lỗi */}
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">
              Loading tracks...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <TrackList tracks={tracks} setCurrentTrack={setCurrentTrack} />
          )}
        </div>

        {/* Hiển thị suggested artists */}
        <SuggestedArtists />
      </main>

      {/* Hiển thị Player khi có bài hát đang phát */}
      {currentTrack && <Player currentTrack={currentTrack} />}
    </div>
  );
}
