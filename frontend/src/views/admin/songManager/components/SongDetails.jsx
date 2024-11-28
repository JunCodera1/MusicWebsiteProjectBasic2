import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const SongDetails = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="10px">
        Chi Tiết Bài Hát
      </Text>
      <VStack spacing="10px" align="flex-start">
        <Text>
          <strong>Tên bài hát:</strong> Shape of You
        </Text>
        <Text>
          <strong>Ca sĩ:</strong> Ed Sheeran
        </Text>
        <Text>
          <strong>Năm phát hành:</strong> 2017
        </Text>
        <Text>
          <strong>Thể loại:</strong> Pop
        </Text>
        <Text>
          <strong>Thời gian:</strong> 4:24
        </Text>
        {/* Các thông tin chi tiết khác */}
      </VStack>
    </Box>
  );
};

export default SongDetails;
