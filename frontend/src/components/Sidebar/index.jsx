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
import { FiMenu } from "react-icons/fi";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoLibrarySharp } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";

import avatarImg from "../../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f.jpg";

import NavItem from "./NavItem";

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
      h="90vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : { base: "75px", md: "200px" }}
      flexDir="column"
      justifyContent="space-between"
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
          icon={FaHeartCirclePlus}
          title="Liked songs"
        />
      </Flex>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="px-5">
        <div className="border border-gray-500 text-white  flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
          <FaEarthAsia /> English
        </div>
      </div>

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
