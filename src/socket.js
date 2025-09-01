import { io } from "socket.io-client";

export const socketInit = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timout: 10000,
    transports: ["websocket"],
  };
  return io(import.meta.env.VITE_SERVER_URL, options);
};
