import React from "react";
import { Box, Image, Text, Button, IconButton } from "@chakra-ui/react";
import { FaPlay, FaHeart } from "react-icons/fa";

const MusicCard = ({ image, title, artist }) => {
  return (
    <Box
      maxW="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
    >
      <Image src={image} alt={title} boxSize="250px" objectFit="cover" />

      <Box p="4">
        <Text fontSize="lg" fontWeight="bold" mb="1">
          {title}
        </Text>
        <Text fontSize="md" color="gray.600">
          {artist}
        </Text>

        <Box display="flex" justifyContent="space-between" mt="3">
          <Button
            leftIcon={<FaPlay />}
            colorScheme="teal"
            size="sm"
            onClick={() => console.log("Play", title)}
          >
            Play
          </Button>
          <IconButton
            icon={<FaHeart />}
            colorScheme="pink"
            size="sm"
            aria-label="Like"
            onClick={() => console.log("Liked", title)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MusicCard;
