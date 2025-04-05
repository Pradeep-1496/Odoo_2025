import express from "express";
import cors from "cors";
import http from "http";    
import { Server as SocketServer } from "socket.io";
import cookieParser from "cookie-parser"
import googlerouter from "./routes/google.route.js";
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js"
import submitRouter from "./routes/submission.route.js"
import communityRoutes from "./routes/community.route.js"
import messageRoutes from "./routes/message.routes.js"

const app= express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*", // replace with frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
    origin:'*',
    credentials: true
}))

// Socket.IO Logic
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // Join a community room
    socket.on("joinRoom", (communityId) => {
      socket.join(communityId);
      console.log(`User ${socket.id} joined community ${communityId}`);
    });
  
    // Leave room
    socket.on("leaveRoom", (communityId) => {
      socket.leave(communityId);
      console.log(`User ${socket.id} left community ${communityId}`);
    });
  
    // Send message
    socket.on("sendMessage", ({ communityId, messageData }) => {
      // Broadcast to all users in the room
      io.to(communityId).emit("receiveMessage", messageData);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1",googlerouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/uploadPost",submitRouter);
app.use("/api/v1/communities", communityRoutes);
app.use("/api/v1/", messageRoutes); 

export {app};
export { server, io };
