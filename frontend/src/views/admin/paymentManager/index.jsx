import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import PaymentList from "./components/PaymentList";
import PaymenttDetails from "./components/PaymentDetails";

const PaymentManager = () => {
  return (
    <Box>
      <Box mb="80px" /> {/* khoảng cách bên dưới */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* Song List component */}
        <PaymentList />

        {/* Song Details component */}
        <PaymenttDetails />
      </SimpleGrid>
    </Box>
  );
};

export default PaymentManager;
