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
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { NavItem } from "./NavItem";

export function RightContent({ items, onToggle, user }) {
  const { colorMode, toggleColorMode } = useColorMode();

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

      <List gap={1} display={{ base: "none", md: "flex", lg: "flex" }}>
        {Array.isArray(items) &&
          items.map((item) => <NavItem key={item.label} {...item} />)}
      </List>
      {/* Avatar Section */}
      <Avatar
        size="sm"
        name={user.name} // Hiển thị tên viết tắt nếu không có ảnh
        src={user.avatar || "https://via.placeholder.com/150"} // Ảnh mặc định nếu không có URL avatar
        cursor="pointer"
        onClick={() => console.log("Avatar clicked!")} // Thêm hành động khi click
      />

      <IconButton
        aria-label="toggle color mode"
        icon={colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
        variant="ghost"
        colorScheme="teal"
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
