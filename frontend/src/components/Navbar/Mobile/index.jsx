import { Collapse, List } from "@chakra-ui/react";
import { MobileNavItem } from "./MobileNavItem";

export function MobileNav({ items = [], isOpen }) {
  return (
    <Collapse in={isOpen} animateOpacity style={{ width: "100%" }}>
      <List
        gap={2}
        spacing={2}
        width="100%"
        borderWidth={1}
        padding={2}
        bg="gray.100"
      >
        {items.map((item) => (
          <MobileNavItem key={item.label} {...item} />
        ))}
      </List>
    </Collapse>
  );
}
