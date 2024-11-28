// AdminUserManagement.jsx
import React from "react";
import {
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminUserManagement = () => {
  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        User Management
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John Doe</Td>
            <Td>johndoe@example.com</Td>
            <Td>Active</Td>
            <Td>
              <Button colorScheme="teal" size="sm">
                View
              </Button>
              <Button colorScheme="red" size="sm" ml={2}>
                Delete
              </Button>
            </Td>
          </Tr>
          {/* Thêm nhiều hàng dữ liệu */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminUserManagement;
