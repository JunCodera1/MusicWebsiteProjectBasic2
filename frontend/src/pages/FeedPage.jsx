import React, { useState, useEffect } from "react";
import TrackList from "../components/TrackList";
import SuggestedArtists from "../components/SuggestedArtists";
import Navbar from "@/components/Navbar";
import LoggedInContainer from "@/containers/LoggedInContainer";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];

const mockTracks = [
  {
    id: 1,
    title: "Song of the Stars",
    artist: "Celestial",
    album: "Galaxy Vibes",
    duration: "3:45",
    genre: "Pop",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNvbmd8ZW58MHx8fHwxNjA2ODQ5NDQ5&ixlib=rb-1.2.1&q=80&w=200",
  },
  {
    id: 2,
    title: "Ocean Waves",
    artist: "Blue Horizon",
    album: "Nature's Symphony",
    duration: "4:15",
    genre: "Ambient",
    cover:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGNvYWx8ZW58MHx8fHwxNjA2ODQ5NDQ5&ixlib=rb-1.2.1&q=80&w=200",
  },
  {
    id: 3,
    title: "Mountain Echoes",
    artist: "Earth Bound",
    album: "Nature's Symphony",
    duration: "5:20",
    genre: "Folk",
    cover:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWlufGVufDB8fHx8MTYwNjg0OTQ0OQ&ixlib=rb-1.2.1&q=80&w=200",
  },
  {
    id: 4,
    title: "City Lights",
    artist: "Urban Beats",
    album: "Nightlife",
    duration: "3:30",
    genre: "Electronic",
    cover:
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNpdHklMjBsaWdodHN8ZW58MHx8fHwxNjA2ODQ5NDQ5&ixlib=rb-1.2.1&q=80&w=200",
  },
];

export default function FeedPage() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sử dụng dữ liệu giả
  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        // Thay thế API call bằng dữ liệu giả
        const data = mockTracks;
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
      <LoggedInContainer>
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
      </LoggedInContainer>
    </div>
  );
}
