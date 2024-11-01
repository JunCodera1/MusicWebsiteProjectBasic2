import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Sidebar = () => {
  return (
    <Flex
      pos={"sticky"}
      left={"5"}
      h={"95vh"}
      marginTop={"2.5vh"}
      boxShadow={"0 4px 12px 0 rgba(0, 0, 0, 0.05)"}
      w="200px"
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Flex
        p={"5%"}
        flexDir={"column"}
        w={"100%"}
        alignItems={"flex-start"}
        mb={4}
      >
        <Divider />
        <Flex>
          <Flex flexDir={"column"} ml={4}>
            <Heading>Minh Tiến</Heading>
            <Text>Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
