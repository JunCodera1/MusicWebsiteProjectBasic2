import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

const UserManager = () => {
  return (
    <Box>
      {/* Thay vì sử dụng <br />, bạn có thể thêm khoảng cách bằng margin */}
      <Box mb="80px" /> {/* khoảng cách bên dưới */}
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
