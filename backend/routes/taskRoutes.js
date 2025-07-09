import express from 'express';
import { assignTask, createTask, deleteTask, getTasksByProject, updateTask } from '../controllers/taskController.js';

const Taskrouter = express.Router();

Taskrouter.post("/create" , createTask);
Taskrouter.get('/project/:projectId', getTasksByProject);
Taskrouter.put('/update-task/:taskId', updateTask);
Taskrouter.post('/:taskId/assign', assignTask);
Taskrouter.delete('/delete-task/:taskId', deleteTask);

export default Taskrouter;