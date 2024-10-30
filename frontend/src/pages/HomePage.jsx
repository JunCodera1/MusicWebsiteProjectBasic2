import React, { useEffect, useState } from 'react';
import { searchTracks } from '../spotify';

const Home = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await searchTracks('your favorite artist');
      setTracks(result);
    };
    fetchTracks();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;