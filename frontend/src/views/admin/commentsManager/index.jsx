import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CommentList from "./components/CommentList";
import CommentDetails from "./components/CommentDetails";

const CommentManager = () => {
  return (
    <Box>
      <Box mb="80px" /> {/* khoảng cách bên dưới */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* Song List component */}
        <CommentList />

        {/* Song Details component */}
        <CommentDetails />
      </SimpleGrid>
    </Box>
  );
};

export default CommentManager;
