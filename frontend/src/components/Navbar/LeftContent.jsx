import {
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem"; // Make sure NavItem is properly set to handle link props
import { FaBurger } from "react-icons/fa6";
import { GiMusicSpell } from "react-icons/gi";

export function LeftContent({ items, onToggle }) {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={4}>
      <IconButton
        aria-label="menu"
        colorScheme="teal"
        variant="ghost"
        icon={<FaBurger />}
        rounded="full"
        display={{ base: "flex", md: "none", lg: "none" }}
        onClick={onToggle}
      />

      <Heading color="teal" fontWeight="black">
        <Button
          as={Link}
          href="/"
          bg={useColorModeValue("white", "gray.800")}
          fontSize={15}
          _hover={{ bg: useColorModeValue("gray.200", "gray.800") }}
          style={{ textDecoration: "none" }}
          aria-label="Navigate to homepage"
        >
          <GiMusicSpell size={30} /> &nbsp; Soundbox
        </Button>
      </Heading>

      <List gap={1} display={{ base: "none", md: "flex", lg: "flex" }}>
        {items.map((item) => (
          <NavItem key={item.label} {...item} /> // Pass item props directly to NavItem
        ))}
      </List>
    </Flex>
  );
}
