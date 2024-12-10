import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "./Card"; // Ensure Card is set up correctly
import { makeAuthenticatedGETRequest } from "@/utils/serverHelper"; // Helper function to make unauthenticated GET requests
import { Howl } from "howler"; // Import Howler for audio playback

const PlaylistView = ({ titleText }) => {
  const [songData, setSongData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSound, setCurrentSound] = useState(null); // Track the current sound playing
  const [currentSong, setCurrentSong] = useState(null); // Track the current song

  // Fetch songs data when the component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await makeAuthenticatedGETRequest(
          "/song/get/allSongs"
        );
        setSongData(response.data); // Assuming the response contains the song data
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError("Failed to load songs. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle play event when a song card is clicked
  const handlePlay = (song) => {
    // If there's already a song playing, stop it
    if (currentSound) {
      currentSound.stop();
    }

    // Create a new Howl instance for the selected song
    const sound = new Howl({
      src: [song.audioUrl], // Assuming 'audioUrl' is the path to the audio file
      html5: true, // Use HTML5 audio for better browser compatibility
      onend: () => {
        setCurrentSound(null); // Reset the sound state when song ends
        setCurrentSong(null); // Reset the song state when song ends
      },
    });

    // Play the new song
    sound.play();

    // Update the current song and sound state
    setCurrentSong(song);
    setCurrentSound(sound);
  };

  return (
    <Box color="white" mt="8" ml="5">
      <Box
        p="5"
        fontFamily="semibold"
        color={useColorModeValue("black", "gray.200")}
        mb="5"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          {titleText}
        </Text>
      </Box>

      <Box overflowX="auto" ml="5">
        <HStack spacing="4" align="start">
          {isLoading ? (
            <Spinner size="lg" /> // Chakra UI spinner while loading
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : songData.length === 0 ? (
            <Text>No songs available</Text>
          ) : (
            songData.map((song, index) => (
              <Box width="300px" key={index}>
                <Card
                  title={song.name}
                  description={song.artist.username} // Assuming artist has 'username'
                  imgUrl={song.thumbnail} // Assuming 'thumbnail' is the property for the image URL
                  onClick={() => handlePlay(song)} // Play song on card click
                />
              </Box>
            ))
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default PlaylistView;
