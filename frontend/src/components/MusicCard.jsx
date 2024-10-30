import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicCard = ({ image, title, artist, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      maxW="400px"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
      p="4"
      display="flex"
      alignItems="center"
    >
      <Image src={image} alt={title} boxSize="80px" borderRadius="md" mr="4" />

      <Box flex="1">
        <Text fontSize="lg" fontWeight="bold" mb="1">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {artist}
        </Text>

        <Slider
          aria-label="Music progress"
          value={currentTime}
          max={duration}
          onChange={(val) => setCurrentTime(val)}
          mt="2"
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack bg="teal.500" />
          </SliderTrack>
          <SliderThumb boxSize={3} />
        </Slider>
      </Box>

      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        colorScheme="teal"
        variant="outline"
        onClick={togglePlayPause}
        ml="4"
        aria-label="Play/Pause"
      />
    </Box>
  );
};

export default MusicCard;
