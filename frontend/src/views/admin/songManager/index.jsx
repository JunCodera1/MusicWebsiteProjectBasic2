import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SongList from "./components/SongList";
import SongDetails from "./components/SongDetails";

const SongManager = () => {
  return (
    <Box>
      <Box mb="80px" /> {/* khoảng cách bên dưới */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* Song List component */}
        <SongList />

        {/* Song Details component */}
        <SongDetails />
      </SimpleGrid>
    </Box>
  );
};

export default SongManager;
