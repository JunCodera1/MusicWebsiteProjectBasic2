import {
  HStack,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { MobileNav } from "./Mobile";

export function Navbar({ menuItemsLeft, menuItemsRight }) {
  const { isOpen, onToggle } = useDisclosure();
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
        <RightContent items={menuItemsRight} onToggle={onToggle} />
      </HStack>
      {/* mobile content */}
      <MobileNav items={menuItemsLeft} isOpen={isOpen} />
    </VStack>
  );
}

export default Navbar;
