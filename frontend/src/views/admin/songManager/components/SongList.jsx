import React from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { songColumnsData } from "../variables/songColumnsData";

const SongList = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="10px">
        Danh Sách Bài Hát
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            {songColumnsData.map((col, index) => (
              <Th key={index}>{col.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {/* Bạn có thể map qua dữ liệu của bài hát ở đây */}
          <Tr>
            <Td>1</Td>
            <Td>Shape of You</Td>
            <Td>Ed Sheeran</Td>
            <Td>2017</Td>
          </Tr>
          {/* Thêm các bài hát khác ở đây */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongList;
