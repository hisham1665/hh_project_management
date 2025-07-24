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
  app.get("*" , (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"))
  })
}

server.listen(5000, () => {
  Connectdb();
  console.log("server run at http://localhost:5000");
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to:', mongoose.connection.name);
  });
});