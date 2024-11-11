// components/Layout.jsx
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex flex="1">
        <Box flex="1" p="20px" ml={{ base: "0px" }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
