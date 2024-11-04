import { HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { MobileNav } from "./Mobile";

const menuItems = [
  {
    label: "Home",
    uri: "/",
  },
  {
    label: "Feed",
    uri: "/feed",
  },
  {
    label: "Library",
    uri: "/library",
  },
  {
    label: "Trending",
    uri: "/trending",
  },
  {
    label: "Upload",
    uri: "/upload",
  },
];

export function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack w="full" spacing={0}>
      <HStack
        w="full"
        alignItems="center"
        p={2}
        justifyContent="space-between"
        borderBottomWidth={1}
      >
        {/* left content */}
        <LeftContent items={menuItems} onToggle={onToggle} />
        {/* right content */}

        <RightContent />
      </HStack>
      {/* mobile content */}
      <MobileNav items={menuItems} isOpen={isOpen} />
    </VStack>
  );
}

export default Navbar;
