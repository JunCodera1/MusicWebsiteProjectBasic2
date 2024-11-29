import { Box, Text, useColorModeValue, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "./Card"; // Ensure Card is properly set up to accept title, description, and imgUrl as props
import { makeAuthenticatedGETRequest } from "@/utils/serverHelper"; // Assuming this helper exists
import { Howl } from "howler"; // Import Howler for playing audio

const PlaylistView = ({ titleText, cardsData }) => {
  const [songData, setSongData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSound, setCurrentSound] = useState(null); // Store the current sound object
  const [currentSong, setCurrentSong] = useState(null); // Store the current song information

  // Fetch songs data when the component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        setSongData(response.data); // Assuming the response contains the song data
      } catch (err) {
        console.error("Error fetching songs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

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
    });

    // Play the new song
    sound.play();

    // Update the current song and sound state
    setCurrentSong(song);
    setCurrentSound(sound);
  };

  // Render loading, error, or song cards
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
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : songData.length === 0 ? (
            <Text>No songs available</Text>
          ) : (
            songData.map((song, index) => (
              <Box width="300px" key={index}>
                <Card
                  title={song.name}
                  description={song.artist.username}
                  imgUrl={song.thumbnail} // Use the appropriate property for the image URL
                  onClick={() => handlePlay(song)} // Add onClick event to play the song
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
