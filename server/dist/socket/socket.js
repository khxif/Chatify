"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://chatify-khxif.vercel.app"],
        credentials: true,
    },
});
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId)
        userSocketMap[userId] = socket.id;
    console.log(userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        console.log(userSocketMap);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
exports.default = {
    app,
    server,
    io,
    getReceiverSocketId,
};