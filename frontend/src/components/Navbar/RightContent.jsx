import {
  Avatar,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button, // Make sure to import the Button
  useColorMode,
  List, // Import useColorMode
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { NavItem } from "./NavItem";

export function RightContent() {
  const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function

  return (
    <Flex alignItems="center" gap={2}>
      <IconButton
        aria-label="search"
        icon={<FaSearch />}
        variant="ghost"
        colorScheme="teal"
        display={{ base: "flex", md: "none" }}
        rounded="full"
        size="sm"
      />
      <InputGroup size="sm" display={{ base: "none", md: "flex" }}>
        <Input variant="filled" placeholder="Search..." width={500} />
        <InputRightElement>
          <FaSearch color="teal" />
        </InputRightElement>
      </InputGroup>

      <IconButton
        aria-label="notifications" // Changed for better accessibility
        icon={<FaBell />}
        variant="ghost"
        colorScheme="teal"
        rounded="full"
        size="sm"
      />

      {/* <Avatar size="sm" name="D C" bg="teal" /> */}
      <List>
        <NavItem uri="/login" key="Login" label="Log in" />
      </List>

      <IconButton
        aria-label="toggle color mode" // Added aria-label for accessibility
        icon={colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
        variant="ghost"
        colorScheme="teal"
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
