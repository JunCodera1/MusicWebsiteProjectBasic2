import React from "react";
import {
  Container,
  Flex,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GiMusicSpell } from "react-icons/gi";
import SignIn from "./SignIn";
import Search from "./SearchBar";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1600px"}
      px={1}
      bg={useColorModeValue("#FFC436", "gray.800")}
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
        <Link to="/upload">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>Upload</Button>
        </Link>
        <Link to="/trending">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>
            Trending
          </Button>
        </Link>
        <Link to="/favourites">
          <Button bg={useColorModeValue("#FFC436", "gray.800")}>
            Favourites
          </Button>
        </Link>

        <Heading as="h1" mb={14}>
          <Search></Search>
        </Heading>
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
          <SignIn></SignIn>
          <Button height={9} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
