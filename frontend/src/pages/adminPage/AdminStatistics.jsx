// AdminStatistics.jsx
import React from "react";
import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

const AdminStatistics = () => {
  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Statistics
      </Text>
      <Stat>
        <StatLabel>Total Songs</StatLabel>
        <StatNumber>150</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" /> 5% more than last month
        </StatHelpText>
      </Stat>

      <Stat mt={4}>
        <StatLabel>Total Users</StatLabel>
        <StatNumber>1200</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" /> 3% more than last month
        </StatHelpText>
      </Stat>

      <Stat mt={4}>
        <StatLabel>Total Revenue</StatLabel>
        <StatNumber>$2500</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" /> 2% less than last month
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default AdminStatistics;
