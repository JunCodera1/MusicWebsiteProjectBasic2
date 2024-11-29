import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { userColumnsData, userData } from "../variables/userData";

const UserList = () => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {userColumnsData.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {userData.map((user, index) => (
          <Tr key={index}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              <Button colorScheme="blue">Edit</Button>
              <Button colorScheme="red" ml={2}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserList;
