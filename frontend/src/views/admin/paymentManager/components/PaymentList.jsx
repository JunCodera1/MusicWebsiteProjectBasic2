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
import { paymentColumnsData, paymentData } from "../variables/paymentData";

const PaymentList = () => {
  return (
    <Box overflowX="auto">
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            {paymentColumnsData.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paymentData.length === 0 ? (
            <Tr>
              <Td colSpan={paymentColumnsData.length} textAlign="center">
                No songs available
              </Td>
            </Tr>
          ) : (
            paymentData.map((payment) => (
              <Tr key={payment.id}>
                <Td>{payment.id}</Td>
                <Td>{payment.userName}</Td>
                <Td>{payment.paymentDate}</Td>
                <Td>{payment.amount}</Td>
                <Td>{payment.paymentStatus}</Td>
                <Td>
                  <ButtonGroup>
                    <Button colorScheme="blue" size="sm">
                      Edit
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

export default PaymentList;
