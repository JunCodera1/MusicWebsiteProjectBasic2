import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const CommentDetails = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="10px">
        Comment Details
      </Text>
      <VStack spacing="10px" align="flex-start">
        <Text>
          <strong>Comment ID:</strong> 12345
        </Text>
        <Text>
          <strong>User:</strong> John Doe
        </Text>
        <Text>
          <strong>Date:</strong> 2024-11-29
        </Text>
        <Text>
          <strong>Comment:</strong> I love this song! It's amazing.
        </Text>
        <Text>
          <strong>Status:</strong> Approved
        </Text>
        {/* Các thông tin chi tiết khác liên quan đến comment */}
      </VStack>
    </Box>
  );
};

export default CommentDetails;
