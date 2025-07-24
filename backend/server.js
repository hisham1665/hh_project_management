import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { Connectdb } from './config/db.js';
import Userrouter from './routes/userRoutes.js';
import Projectrouter from './routes/projectRoutes.js';
import Taskrouter from './routes/taskRoutes.js';
import messageRouter from './routes/messageRoute.js';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});


app.set('io', io);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
const __dirname = path.resolve();
app.use(express.json());

app.use("/api/user/", Userrouter);
app.use("/api/project/", Projectrouter);
app.use("/api/task/", Taskrouter);
app.use("/api/message/", messageRouter);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend/dist")))
  console.log("Running in production. Serving frontend...");
  app.get(/^\/(?!api).*/, (req, res) => {
    console.log("Catch-all route hit:", req.originalUrl);
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// --- THE FIX: A truly robust startup sequence ---
const startServer = async () => {
  try {
    // 1. Connect to the database FIRST.
    await Connectdb();
    console.log('✅ Mongoose connected successfully.');

    // 2. Add error handling for the server listening process.
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ FATAL ERROR: Port 5000 is already in use by another application.`);
      } else {
        console.error(`❌ FATAL ERROR during server startup:`, error);
      }
      process.exit(1);
    });

    // 3. Only if the DB is connected, start listening.
    server.listen(5000, () => {
      console.log("✅ Server is ready and listening at http://localhost:5000");
    });

  } catch (error) {
    // 4. If the DB connection fails, log the error and exit.
    console.error("❌ FATAL ERROR: Failed to connect to the database. Server will not start.", error);
    process.exit(1);
  }
};
startServer();
// Start the server using the new function