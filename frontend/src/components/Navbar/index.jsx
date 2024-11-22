import {
  HStack,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { MobileNav } from "./Mobile";
import { useState, useEffect } from "react";

export function Navbar({ menuItemsLeft, menuItemsRight }) {
  const { isOpen, onToggle } = useDisclosure();
  const [user, setUser] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/auth/get/users/:userId"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <VStack w="full" spacing={0}>
      <HStack
        w="full"
        alignItems="center"
        p={2}
        justifyContent="space-between"
        borderBottomWidth={1}
        bg={useColorModeValue("gray.300", "gray.800")}
      >
        {/* left content */}
        <LeftContent items={menuItemsLeft} onToggle={onToggle} />
        {/* right content */}
        <RightContent items={menuItemsRight} onToggle={onToggle} user={user} />
      </HStack>
      {/* mobile content */}
      <MobileNav items={menuItemsLeft} isOpen={isOpen} />
    </VStack>
  );
}

export default Navbar;
