import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const PaymentDetails = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="10px">
        Payment Details
      </Text>
      <VStack spacing="10px" align="flex-start">
        <Text>
          <strong>User name:</strong> Minh Tiến
        </Text>
        <Text>
          <strong>Payment Date:</strong> 20-10-2024
        </Text>
        <Text>
          <strong>Amount:</strong> 99.000 VND
        </Text>
        <Text>
          <strong>Payment Status:</strong> Complete
        </Text>
        {/* Các thông tin chi tiết khác */}
      </VStack>
    </Box>
  );
};

export default PaymentDetails;
