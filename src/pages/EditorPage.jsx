import { ACTIONS } from "@/actions";
import Editor from "@/components/Editor";
import EditorDrawer from "@/components/EditorDrawer";
import Sidebar from "@/components/Sidebar";
import { toaster } from "@/components/ui/toaster";
import { socketInit } from "@/socket";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);

  const handleError = useCallback(
    (err) => {
      console.error("Socket Connection Error: ", err);
      toaster.create({ title: "Socket Connection Error!", type: "error" });
      navigate("/");
    },
    [navigate]
  );

  const leaveRoom = () => {
    socketRef.current.emit(ACTIONS.LEAVE, {});
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      socketRef.current = await socketInit();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toaster.create({ title: `${username} joined!`, type: "info" });
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        console.log(socketId, username);
        toaster.create({ title: `${username} left!`, type: "info" });
        setClients((p) => p.filter((client) => client.socketId !== socketId));
      });

      return () => {
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.disconnect();
      };
    })();
  }, [handleError, location.state?.username, roomId]);

  if (!location.state) return <Navigate to={"/"} />;

  return (
    <Box display={"flex"}>
      <EditorDrawer>
        <Sidebar
          clients={clients}
          roomId={roomId}
          leaveRoom={leaveRoom}
          codeRef={codeRef}
        />
      </EditorDrawer>
      <Box
        hideBelow={"md"}
        height={"100vh"}
        width={"22%"}
        background={"#111111"}
        p={4}
      >
        <Sidebar
          clients={clients}
          roomId={roomId}
          leaveRoom={leaveRoom}
          codeRef={codeRef}
        />
      </Box>
      <Box width={{ base: "100%", md: "78%" }} p={4} color={"white"}>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </Box>
    </Box>
  );
};

export default EditorPage;
