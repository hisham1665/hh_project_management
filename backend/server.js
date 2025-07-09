import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { Connectdb } from './config/db.js';
import Userrouter from './routes/userRoutes.js';
import Projectrouter from './routes/projectRoutes.js';
import Taskrouter from './routes/taskRoutes.js';
dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Your React app URL
    credentials: true,                // If you plan to use cookies or authentication
  }));
const __dirname = path.resolve();
app.use(express.json())

app.use("/api/user/" ,Userrouter);
app.use("/api/project/", Projectrouter);
app.use("/api/task/" , Taskrouter);
app.listen(5000, ()=> {
  Connectdb()
    console.log("server run at http://localhost:5000")
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to:', mongoose.connection.name);
      });
      
})