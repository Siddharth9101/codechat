import {
  ScrollArea,
  StackSeparator,
  Text,
  HStack,
  VStack,
  Avatar,
  Box,
  Image,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { useCallback, useState } from "react";
import axios from "axios";

const Sidebar = ({ clients, roomId, leaveRoom, codeRef }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const languageId = 63;
  const copyRoomId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toaster.create({
        title: "RoomId copied to your clipboard!",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      toaster.create({ title: "Unable to copy RoomId!", type: "error" });
    }
  }, [roomId]);

  const runCode = useCallback(async () => {
    setLoading(true);
    const code = codeRef.current;
    try {
      const { data } = await axios.post("http://localhost:8000/run", {
        code,
        languageId,
      });
      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput("No output received.");
      }
    } catch (error) {
      console.error(error);
      setOutput("Error running code!");
    } finally {
      setLoading(false);
    }
  }, [codeRef]);

  // const
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Image
        src="/images/codeChat_logo.png"
        alt="logo"
        height="18"
        objectFit={"cover"}
      />
      <Text fontWeight="bold" fontSize="lg" mb={6} mt={4}>
        Connected
      </Text>
      <ScrollArea.Root flex="1">
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <VStack separator={<StackSeparator />} align="start">
              {clients?.map((client) => (
                <HStack key={client.socketId}>
                  <Avatar.Root>
                    <Avatar.Fallback name={client.username} />
                  </Avatar.Root>
                  <Text truncate maxW={"200px"}>
                    {client.username}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
      <VStack w="100%" spacing={1} mt="auto">
        <Button
          w="100%"
          bg="#18AC67"
          color="#fff"
          _hover={{ bg: "#107b49" }}
          onClick={copyRoomId}
        >
          Copy Room Id
        </Button>
        <Button
          w="100%"
          bg="#c92727"
          color="#fff"
          _hover={{ bg: "#bc1313" }}
          onClick={leaveRoom}
        >
          Leave
        </Button>
      </VStack>
      {/* Drawer */}
      <Drawer.Root
        placement={"bottom"}
        size={"full"}
        onOpenChange={(open) => {
          if (open) runCode();
        }}
      >
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm" mt={2}>
            RUN
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>
                  <Image
                    src="/images/codeChat_logo.png"
                    alt="logo"
                    height={"60px"}
                  />
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                {loading ? <Spinner size="md" /> : output}
              </Drawer.Body>
              <Drawer.Footer></Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};

export default Sidebar;
