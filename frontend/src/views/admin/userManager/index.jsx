import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

const UserManager = () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* User List component */}
        <UserList />

        {/* User Details component */}
        <UserDetails />
      </SimpleGrid>
    </Box>
  );
};

export default UserManager;
