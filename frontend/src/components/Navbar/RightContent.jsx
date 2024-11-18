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
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { useNavigate } from "react-router-dom";

export function RightContent({ items, user = null }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate(); // Hook phải được gọi trong component function
  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  };

  // Xóa cookie token
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    deleteCookie("token");

    // Điều hướng người dùng về trang đăng nhập
    navigate("/login"); // Đảm bảo dùng navigate trong component function
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
            <MenuItem onClick={() => console.log("View Profile")}>
              View Profile
            </MenuItem>
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
    </Flex>
  );
}
