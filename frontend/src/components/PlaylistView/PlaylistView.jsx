import { Box, Text, useColorModeValue, HStack } from "@chakra-ui/react";
import React from "react";
import Card from "./Card"; // Ensure Card is properly set up to accept title, description, and imgUrl as props

const PlaylistView = ({ titleText, cardsData }) => {
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
          {cardsData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default PlaylistView;
