import {
  Button,
  Collapse,
  Link,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
export function MobileNavItem({ label, uri, subitems }) {
  const { isOpen, onToggle } = useDisclosure();
  if (subitems) {
    return (
      <>
        <Button
          variant="ghost"
          w="full"
          rightIcon={
            <FaChevronDown
              style={{
                transition: "transform .2s ease 0s",
                transform: isOpen ? "rotate(-180deg)" : "",
              }}
            />
          }
          justifyContent="space-between"
          colorScheme="teal"
          onClick={onToggle}
        >
          {label}
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <List px={4}>
            {subitems?.map((subitem) => (
              <ListItem key={subitem.label} w="full">
                <Link
                  href={subitem.uri}
                  p={2}
                  w="full"
                  rounded="lg"
                  display="block"
                  _hover={{ textDecoration: " none", bg: "teal.50" }}
                  _active={{ bg: "teal.100" }}
                >
                  {subitem.label}
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  return (
    <ListItem key={label} w="full">
      <Link
        href={uri}
        display="block"
        rounded="lg"
        _hover={{ textDecoration: "none", bg: "teal.50" }}
        _active={{ bg: "teal.100" }}
        px={4}
        py={2}
        fontWeight="semibold"
        color="teal.600"
      >
        {label}
      </Link>
    </ListItem>
  );
}
