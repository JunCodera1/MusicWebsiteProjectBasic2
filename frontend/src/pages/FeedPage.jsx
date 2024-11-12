import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TrackList from '../components/TrackList';
import SuggestedArtists from '../components/SuggestedArtists';
import Player from '../components/Player';

export default function FeedPage() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/tracks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Failed to load tracks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex">
        <div className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-6">Hear the latest posts from the people you're following:</h1>
          {isLoading ? (
            <div className="text-center py-8">Loading tracks...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <TrackList tracks={tracks} setCurrentTrack={setCurrentTrack} />
          )}
        </div>
        <SuggestedArtists />
      </main>
      <Player currentTrack={currentTrack} />
    </div>
  );
}