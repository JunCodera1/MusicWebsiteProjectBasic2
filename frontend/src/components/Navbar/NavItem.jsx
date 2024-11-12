import {
  Button,
  Link,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

export function NavItem({ label, uri, subitems }) {
  const { isOpen, onToggle } = useDisclosure();

  // If the item has subitems, render the Popover menu
  if (subitems) {
    return (
      <ListItem>
        <Popover placement="top-start" isOpen={isOpen}>
          <PopoverTrigger>
            <Button
              rightIcon={
                <FaChevronDown
                  style={{
                    transition: "transform .2s ease 0s",
                    transform: isOpen ? "rotate(-180deg)" : "",
                  }}
                />
              }
              colorScheme="teal"
              variant="ghost"
              onClick={onToggle}
              aria-expanded={isOpen ? "true" : "false"} // Add aria-expanded for accessibility
              aria-controls={`subitems-${label}`} // Link button with subitems dropdown
            >
              {label}
            </Button>
          </PopoverTrigger>
          <PopoverContent width="full">
            <PopoverArrow />
            <PopoverBody>
              <List display="flex" flexDir="column" gap={4}>
                {subitems.map((subitem) => (
                  <ListItem key={subitem.label}>
                    <Link href={subitem.uri} px={2} py={1}>
                      {subitem.label}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ListItem>
    );
  }

  // For items without subitems, render the regular button
  return (
    <ListItem>
      <Button
        as={Link}
        href={uri}
        colorScheme="teal"
        variant="ghost"
        _hover={{ textDecoration: "none", bg: "teal.50" }}
        _active={{ bg: "teal.100" }}
      >
        {label}
      </Button>
    </ListItem>
  );
}
