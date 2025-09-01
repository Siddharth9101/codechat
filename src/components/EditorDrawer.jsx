import {
  Button,
  CloseButton,
  Drawer,
  Image,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { GoSidebarCollapse } from "react-icons/go";
const EditorDrawer = ({ children }) => {
  return (
    <Drawer.Root placement={"start"} size="xs">
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="lg" hideFrom={"md"}>
          <GoSidebarCollapse style={{ color: "#fff", height: "100%" }} />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header></Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            <Drawer.Footer></Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default EditorDrawer;
