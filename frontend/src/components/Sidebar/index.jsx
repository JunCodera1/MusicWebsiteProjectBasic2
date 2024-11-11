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
  Box,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoLibrarySharp } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";

import avatarImg from "../../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f.jpg";

import NavItem from "./NavItem";
import { FaMusic } from "react-icons/fa";
import { GiMusicSpell } from "react-icons/gi";

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
      left="0"
      h={"100vh"}
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : { base: "75px", md: "200px" }}
      flexDir="column"
      justifyContent="flex-start"
      bg={useColorModeValue("gray.300", "gray.700")}
      marginLeft={"10px"}
      zIndex={"100"}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex
          align="center"
          fontWeight="bold"
          fontSize="2xl"
          mt={4}
          color={useColorModeValue("black", "white")}
        >
          <GiMusicSpell size={40} />
          {navSize !== "small" && <Text ml={2}>Soundbox</Text>}
        </Flex>
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
          icon={IoIosHome}
          title="Dashboard"
          description="This is the description for the dashboard."
        />
        <NavItem navSize={navSize} icon={IoLibrarySharp} title="Library" />
        <NavItem
          navSize={navSize}
          icon={AiFillPlusSquare}
          title="Create playlist"
        />
        <NavItem
          navSize={navSize}
          icon={FaMusic}
          title="My music"
          href={"/mySong"}
        />
        <NavItem
          navSize={navSize}
          icon={FaHeartCirclePlus}
          title="Liked songs"
        />
      </Flex>

      <Box px={5} mb={4}>
        <Flex
          border="1px"
          borderColor="gray.500"
          color="white"
          px={2}
          py={1}
          rounded="full"
          align="center"
          justify="center"
          _hover={{ borderColor: "white" }}
          cursor="pointer"
        >
          <FaEarthAsia />
          {navSize !== "small" && <Text ml={2}>English</Text>}
        </Flex>
      </Box>
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
              Jun
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
