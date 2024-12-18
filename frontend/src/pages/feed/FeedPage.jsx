import React, { useState, useEffect } from "react";
import TrackList from "../../components/TrackList";
import SuggestedArtists from "../../components/SuggestedArtists";
import LoggedInContainer from "@/containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "@/utils/serverHelper";

export default function FeedPage() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // API call
  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const response = await makeAuthenticatedGETRequest(
          "/song/get/allsongs"
        );
        const data = response.data;

        setTracks(data); // Nếu thành công, lưu danh sách bài hát
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    // Fetch the user ID from your authentication system
    const fetchUserId = async () => {
      try {
        const userResponse = await makeAuthenticatedGETRequest("/user/current");
        if (!userResponse && !userResponse.data && !userResponse.data._id) {
          throw new Error("Invalid user data received");
        }
        setUserId(userResponse.data._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <LoggedInContainer>
        <main className="flex-grow flex">
          <div className="flex-grow p-6">
            <h1 className="text-2xl font-bold mb-6">
              Hear the latest posts from the people you're following:
            </h1>

            {isLoading ? (
              <div className="text-center py-8 text-gray-400">
                Loading tracks...
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <TrackList
                tracks={tracks}
                setCurrentTrack={setCurrentTrack}
                setTracks={setTracks}
              />
            )}
          </div>

          {/* Hiển thị suggested artists */}
          <SuggestedArtists />
        </main>
      </LoggedInContainer>
    </div>
  );
}
