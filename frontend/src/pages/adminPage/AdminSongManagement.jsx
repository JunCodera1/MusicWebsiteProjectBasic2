// AdminSongManagement.jsx
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

const AdminSongManagement = () => {
  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Song Management
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Song Title</Th>
            <Th>Artist</Th>
            <Th>Genre</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Song Title 1</Td>
            <Td>Artist 1</Td>
            <Td>Pop</Td>
            <Td>
              <Button colorScheme="teal" size="sm">
                Edit
              </Button>
              <Button colorScheme="red" size="sm" ml={2}>
                Delete
              </Button>
            </Td>
          </Tr>
          {/* Thêm nhiều bài hát */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminSongManagement;
