import React from "react";
import {
  Flex,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Box,
} from "@chakra-ui/react";
import NavHoverBox from "../NavHoverBox";
import { Link } from "react-router-dom";

export default function NavItem({
  icon,
  title,
  description,
  active,
  navSize,
  href,
}) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Box
          as={Link}
          to={href}
          backgroundColor={active ? "#AEC8CA" : "transparent"}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: "teal.300",
            transform: "scale(1.05)", // Thêm hiệu ứng phóng to khi hover
            transition: "transform 0.3s ease", // Giảm thời gian transition để mượt mà hơn
          }}
          w={navSize === "large" ? "100%" : "auto"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text
                ml={5}
                fontSize={15}
                display={navSize === "small" ? "none" : "flex"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Box>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
