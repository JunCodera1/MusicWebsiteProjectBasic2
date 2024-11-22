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
  Badge,
  Box,
  Text,
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { useState } from "react";

export function RightContent({ items, user = null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  };

  const handleLogout = () => {
    deleteCookie("token");
    console.log("Logged out");
  };

  const profileData = {
    name: user?.username || "Unknown",
    email: user?.email || "N/A",
    role: user?.role || "User",
  };

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from admin", read: false },
    { id: 2, message: "Your subscription is about to expire", read: false },
    { id: 3, message: "New song added to your playlist", read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
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

      {/* Notifications */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="notifications"
          icon={<FaBell />}
          variant="ghost"
          colorScheme="teal"
          rounded="full"
          size="sm"
          position="relative"
        >
          {notifications.some((notif) => !notif.read) && (
            <Badge
              colorScheme="red"
              position="absolute"
              top="0"
              right="0"
              fontSize="xs"
              rounded="full"
              bg={""}
            >
              {notifications.filter((notif) => !notif.read).length}
            </Badge>
          )}
        </MenuButton>
        <MenuList>
          {notifications.map((notif) => (
            <MenuItem
              key={notif.id}
              bg={notif.read ? "gray.500" : "gray.700"}
              fontWeight={notif.read ? "normal" : "bold"}
            >
              {notif.message}
            </MenuItem>
          ))}
          <MenuItem fontWeight="bold" onClick={markAllAsRead}>
            Mark all as read
          </MenuItem>
        </MenuList>
      </Menu>

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
            <MenuItem onClick={onProfileOpen}>View Profile</MenuItem>
            <MenuItem onClick={onSettingsOpen}>Settings</MenuItem>
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
      <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
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
            <Button colorScheme="teal" mr={3} onClick={onProfileClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Settings */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Input
                placeholder="Update Name"
                defaultValue={user?.username || ""}
                variant="filled"
              />
              <Input
                placeholder="Update Email"
                defaultValue={user?.email || ""}
                type="email"
                variant="filled"
              />
              <Input
                placeholder="New Password"
                type="password"
                variant="filled"
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onSettingsClose}>
              Save
            </Button>
            <Button variant="ghost" onClick={onSettingsClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
