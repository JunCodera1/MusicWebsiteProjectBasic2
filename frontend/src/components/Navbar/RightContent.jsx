import {
  Avatar,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorMode,
  List,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { NavItem } from "./NavItem";

export function RightContent({ items, user = null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  };

  const handleLogout = () => {
    deleteCookie("token");
    console.log("Logged out");
  };

  const profileData = {
    name: user?.name || "Unknown",
    email: user?.email || "N/A",
    role: user?.role || "User",
  };

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
        aria-label="notifications"
        icon={<FaBell />}
        variant="ghost"
        colorScheme="teal"
        rounded="full"
        size="sm"
      />

      {/* Avatar with Dropdown Menu */}
      {user ? (
        <Menu>
          <MenuButton
            as={Avatar}
            size="sm"
            name={user.name}
            src={user.avatar || "https://via.placeholder.com/150"}
            cursor="pointer"
          />
          <MenuList>
            <MenuItem onClick={onOpen}>View Profile</MenuItem>
            <MenuItem onClick={() => console.log("Settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        ""
      )}

      <List gap={1} display={{ base: "none", md: "flex", lg: "flex" }}>
        {Array.isArray(items) &&
          items.map((item) => <NavItem key={item.label} {...item} />)}
        {user ? "" : <NavItem label={"Login"} uri={"/login"} />}
      </List>

      <IconButton
        aria-label="toggle color mode"
        icon={colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
        variant="ghost"
        colorScheme="teal"
        onClick={toggleColorMode}
      />

      {/* Modal for Profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Field</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>{profileData.name}</Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>{profileData.email}</Td>
                </Tr>
                <Tr>
                  <Td>Role</Td>
                  <Td>{profileData.role}</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
