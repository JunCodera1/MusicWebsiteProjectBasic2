import React from "react";
import { Box, Text } from "@chakra-ui/react";

const UserDetails = () => {
  // Giả sử bạn sẽ nhận thông tin người dùng từ một state hoặc props
  const selectedUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    lastLogin: "2024-11-28",
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="2xl" mb={4}>
        User Details
      </Text>
      <Text>
        <strong>Name:</strong> {selectedUser.name}
      </Text>
      <Text>
        <strong>Email:</strong> {selectedUser.email}
      </Text>
      <Text>
        <strong>Role:</strong> {selectedUser.role}
      </Text>
      <Text>
        <strong>Last Login:</strong> {selectedUser.lastLogin}
      </Text>
    </Box>
  );
};

export default UserDetails;
