import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser, FiSettings } from "react-icons/fi";
import avatarImg from "/home/jun/Documents/MusicWebsiteProjectBasic2/frontend/src/assets/images/avatar1.png";
import NavItem from "../components/NavItem";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isSmallScreen) {
      changeNavSize("small");
    } else {
      changeNavSize("large");
    }
  }, [isSmallScreen]);

  return (
    <Flex
      pos="flex-start"
      left="5"
      h="86vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : { base: "75px", md: "200px" }}
      flexDir="column"
      justifyContent="space-between"
      bg={useColorModeValue("gray.300", "gray.700")}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Dashboard"
          description="This is the description for the dashboard."
        />
        <NavItem navSize={navSize} icon={FiUser} title="Clients" />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src={avatarImg} />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Minh Tiến
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
