import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {}; // { userId: Set(socketIds) }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("✅ User connected:", userId);

  if (userId) {
    if (!users[userId]) users[userId] = new Set();
    users[userId].add(socket.id);
    console.log(users)
  }

  io.emit("getOnlineUser", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", userId);
    if (userId && users[userId]) {
      users[userId].delete(socket.id);
      if (users[userId].size === 0) delete users[userId];
    }
    io.emit("getOnlineUser", Object.keys(users));
  });
});

// ✅ Utility function to get a receiver's socket ID (first socket)
export const getReciverSocket = (receiverId) => {
  if (users[receiverId]) {
    // return any one socket ID from the Set
    return Array.from(users[receiverId])[0];
  }
  return null;
};


// ✅ Export io and app for controllers to use
export { app, io, server };
