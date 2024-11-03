import React from "react";
import {
  Container,
  Flex,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Input,
  background,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GiMusicSpell } from "react-icons/gi";
import Search from "./SearchBar";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1600px"}
      px={1}
      bg={useColorModeValue("#FFC436", "gray.800")}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link to="/">
          <Button
            color={useColorModeValue("pink.600", "lightblue")}
            bg={useColorModeValue("gray.100", "gray.800")}
            fontSize={15}
          >
            {" "}
            <GiMusicSpell size={30} /> Soundbox
          </Button>
        </Link>
        <Link to="/">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>Home</Button>
        </Link>
        <Link to="/feed">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>Feed</Button>
        </Link>
        <Link to="/library">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>Library</Button>
        </Link>
        <Link to="/favourites">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>Favourites</Button>
        </Link>
        <Link to="/trending">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>
            Trending
          </Button>
        </Link>
        <Link to="/upload">
          <Button
            bgGradient="linear(to-r, teal.400, blue.500)"
            _hover={{
              bgGradient: "linear(to-r, pink.500, orange.500)",
              transform: "scale(1.05)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",

            }}
            px={4}
            py={2}
            rounded="md"
          >
            Upload
          </Button>
        </Link>


        <Input
          width={500}
          height={9}
          color={useColorModeValue("teal.700", "blue.200")}
          placeholder="Search..."
          _placeholder={{ color: "inherit" }}
        />
        <Link to="/feed">
          <Button
            bg={useColorModeValue("#FFC436", "gray.800")}
            textColor={useColorModeValue("black", "white")}
            fontSize={20}
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            textAlign="center"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
              transition: "background 0.3s ease",
            }}
            className="cursor-pointer"
          >
            Try Pro
          </Button>
        </Link>
        <HStack>
          <Button height={9} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
