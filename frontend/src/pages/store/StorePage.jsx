import React from "react";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaPlay } from "react-icons/fa";
import { Button, Spinner } from "@chakra-ui/react";
import LoggedInContainer from "@/containers/LoggedInContainer";

const fakeTracks = [
  {
    id: 1,
    name: "Track 1",
    artist: "Artist 1",
    thumbnail: "/path/to/track1-thumbnail.jpg",
    price: "$1.99",
  },
  {
    id: 2,
    name: "Track 2",
    artist: "Artist 2",
    thumbnail: "/path/to/track2-thumbnail.jpg",
    price: "$1.99",
  },
  {
    id: 3,
    name: "Track 3",
    artist: "Artist 3",
    thumbnail: "/path/to/track3-thumbnail.jpg",
    price: "$1.99",
  },
  // Add more fake tracks as needed
];

const StorePage = () => {
  const [loading, setLoading] = useState(false); // Loading state for store page
  const [error, setError] = useState(null); // Error state

  // Simulate fetching store data
  const fetchStoreData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate an API call delay
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError("Failed to load store data. Please try again later.");
      console.error("Error fetching store data:", error);
    }
  };

  return (
    <LoggedInContainer>
      <div className="store-page p-6">
        <h1 className="text-2xl font-semibold mb-6">Store</h1>

        {/* Fetch button for simulating loading */}
        <Button
          onClick={fetchStoreData}
          isLoading={loading}
          loadingText="Loading..."
          colorScheme="blue"
          mb={6}
        >
          Load Store Data
        </Button>

        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakeTracks.map((track) => (
            <div key={track.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={track.thumbnail}
                alt={track.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{track.name}</h2>
              <p className="text-gray-500 mb-4">{track.artist}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{track.price}</span>
                <Button colorScheme="orange" leftIcon={<FaPlay />}>
                  Play
                </Button>
                <Button colorScheme="red" leftIcon={<FaHeart />}>
                  Like
                </Button>
                <Button colorScheme="blue" leftIcon={<FaShoppingCart />}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default StorePage;
