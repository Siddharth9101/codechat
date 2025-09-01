import { toaster } from "@/components/ui/toaster";
import {
  AbsoluteCenter,
  Box,
  Button,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createNewRoom = useCallback(() => {
    const id = uuidv4();
    setRoomId(id);
    toaster.create({
      title: "New room created",
      type: "success",
    });
  }, []);

  const joinRoom = useCallback(() => {
    if (!roomId || !username) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    if (username.length < 3) {
      toaster.create({
        title: "Username must be at least 3 characters",
        type: "error",
      });
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  }, [navigate, roomId, username]);
  return (
    <Box height={"100vh"} width={"100vw"} background={"#09090B"}>
      <AbsoluteCenter maxW={"90%"} shadow={"md"}>
        <VStack
          spaceY={"2.5"}
          backgroundColor={"#171616"}
          padding={"6"}
          rounded={"lg"}
          width={"sm"}
          display={"flex"}
          alignItems={"start"}
        >
          <Image src="/images/codeChat_logo.png" alt="logo" />
          <Text color="#fff">Paste invitation ROOM ID</Text>
          <Input
            placeholder="ROOM ID"
            background={"#292929"}
            color={"white"}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Input
            placeholder="USERNAME"
            background={"#292929"}
            color={"white"}
            onKeyUp={(e) => e.code === "Enter" && joinRoom()}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box alignSelf={"end"}>
            <Button
              background={"#18AC67"}
              color={"white"}
              width={"80px"}
              _hover={{ background: "#107b49" }}
              onClick={joinRoom}
            >
              Join
            </Button>
          </Box>
          <Box alignSelf={"center"}>
            <Text color={"#fff"} fontSize={"sm"}>
              If you don't have an invite then create{" "}
              <Link
                display={"inline"}
                color={"#18AC67"}
                _hover={{ color: "#107b49" }}
                onClick={createNewRoom}
              >
                new room
              </Link>
            </Text>
          </Box>
        </VStack>
      </AbsoluteCenter>
      <Box
        position={"absolute"}
        bottom={"2"}
        textAlign={"center"}
        minW={"100%"}
      >
        <Text color="#fff">
          Made with 💛 by{" "}
          <Link
            href="https://github.com/Siddharth9101"
            target="_blank"
            color={"#fff"}
          >
            Siddharth Saxena
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
