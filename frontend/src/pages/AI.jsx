import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import LoggedInContainer from "@/containers/LoggedInContainer";

const AI = () => {
  return (
    <LoggedInContainer>
      <Flex
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, blue.500, purple.500)"
        borderRadius={"20px"}
        gap={4}
      >
        <Box
          w={{ base: "95%", md: "80%", lg: "70%" }}
          h={{ base: "80%", md: "90%" }}
          boxShadow="2xl"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
        >
          <Heading
            size="md"
            textAlign="center"
            py={4}
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            fontWeight="bold"
          >
            SoundBox Application
          </Heading>
          <Box
            as="iframe"
            src="http://localhost:4321"
            title="Translaher App"
            width="100%"
            height="100%"
            border="4px solid"
            borderColor="transparent"
            borderRadius="50px"
            boxShadow="lg"
            sx={{
              borderImageSource:
                "linear-gradient(to right, teal.400, blue.500)",
              borderImageSlice: 1,
            }}
          />
        </Box>
      </Flex>
    </LoggedInContainer>
  );
};

export default AI;
