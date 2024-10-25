import React from "react";
import {
  Container,
  Flex,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GiMusicSpell } from "react-icons/gi";
import SignIn from "./SignIn";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link to="/">
          <Button
            color={useColorModeValue("pink.600", "lightblue")}
            bg={useColorModeValue("gray.100", "gray.900")}
            _hover={{ bg: "transparent" }}
            fontSize={15}
          >
            {" "}
            <GiMusicSpell size={30} /> Soundbox
          </Button>
        </Link>
        <Input
          width={350}
          height={9}
          color="teal"
          placeholder="Search..."
          _placeholder={{ color: "inherit" }}
        />
        <HStack spacing={2} alignItems={"center"} position="relative">
          <Link to={"/create"}>
            <Button height={9}>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button height={9} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
          <SignIn></SignIn>
        </HStack>
        
      </Flex>
    </Container>
  );
};

export default Navbar;
