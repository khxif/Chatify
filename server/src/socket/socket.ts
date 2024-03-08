import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: UserSocketMap = {};

io.on("connection", (socket) => {
  const userId: any = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  console.log(userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log(userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const exportsObject = {
  app,
  server,
  io,
  getReceiverSocketId,
};

export default exportsObject;
