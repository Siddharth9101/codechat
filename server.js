import express from "express";
import { Server } from "socket.io";
import http from "http";
import { ACTIONS } from "./src/actions.js";
import path from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import axios from "axios";
import cors from "cors";

const PORT = import.meta.env?.VITE_SERVER_PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/run", async (req, res) => {
  const { code, languageId } = req.body;

  const response = await axios.post(
    "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
    {
      source_code: code,
      language_id: languageId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const token = response.data.token;
  const newUrl = `https://ce.judge0.com/submissions/${token}?base64_encoded=false&fields=stdout,stderr`;

  const { data } = await axios.get(newUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  res.json(data);
});

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return { socketId, username: userSocketMap[socketId] };
    }
  );
};

const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("New Connection, ", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ code, socketId }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.LEAVE, () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
      socket.leave(roomId);
    });
    delete userSocketMap[socket.id];
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

server.listen(PORT, console.log("Server is listning on port ", PORT));
