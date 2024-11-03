import React from "react";
import MusicCard from "../components/MusicCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { searchTracks } from '../spotify';
function FeedPage() {
  const songs = [
    {
      image: "https://link-to-album-cover.jpg",
      title: "Song Title",
      artist: "Artist Name",
    },
  ];

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {songs.map((song, index) => (
        <SimpleGrid columns={[2, null, 3]} spacing="40px">
          <Box bg="tomato" height="80px">
            <MusicCard
              key={index}
              image={song.image}
              title={song.title}
              artist={song.artist} />
          </Box>
          <Box bg="tomato" height="80px">
            <MusicCard
              key={index}
              image={song.image}
              title={song.title}
              artist={song.artist} />
          </Box>
        </SimpleGrid>
      ))}
    </div>
  );
}

export default FeedPage;
