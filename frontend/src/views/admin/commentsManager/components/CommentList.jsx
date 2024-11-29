import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { commentColumnsData, commentData } from "../variables/commentData";

const CommentList = () => {
  return (
    <Box overflowX="auto">
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            {commentColumnsData.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {commentData.length === 0 ? (
            <Tr>
              <Td colSpan={commentColumnsData.length} textAlign="center">
                No comments available
              </Td>
            </Tr>
          ) : (
            commentData.map((comment) => (
              <Tr key={comment.id}>
                <Td>{comment.id}</Td>
                <Td>{comment.user}</Td>
                <Td>{comment.comment}</Td>
                <Td>{comment.date}</Td>
                <Td>{comment.status}</Td>
                <Td>
                  <ButtonGroup>
                    <Button colorScheme="blue" size="sm">
                      Approve
                    </Button>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CommentList;
