// AdminDashboard.jsx
import React from "react";
import { Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Box p={6}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Admin Dashboard
      </Text>
      <Grid templateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={6}>
        {/* Quản lý người dùng */}
        <GridItem>
          <Box
            bg="teal.500"
            color="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              User Management
            </Text>
            <Link to="/admin/users">
              <Button colorScheme="teal">Go to User Management</Button>
            </Link>
          </Box>
        </GridItem>

        {/* Quản lý bài hát */}
        <GridItem>
          <Box
            bg="purple.500"
            color="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              Song Management
            </Text>
            <Link to="/admin/songs">
              <Button colorScheme="purple">Go to Song Management</Button>
            </Link>
          </Box>
        </GridItem>

        {/* Thống kê */}
        <GridItem>
          <Box
            bg="blue.500"
            color="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              Statistics
            </Text>
            <Link to="/admin/statistics">
              <Button colorScheme="blue">View Statistics</Button>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
