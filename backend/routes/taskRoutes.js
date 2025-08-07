import express from 'express';
import { addTaskToProject, assignTask, createTask, deleteTask, getTasksByProject, updateTask, getTaskComments, postTaskComment, GenerateTasks } from '../controllers/taskController.js';

const Taskrouter = express.Router();

Taskrouter.post("/create" , createTask);
Taskrouter.get('/project/:projectId', getTasksByProject);
Taskrouter.put('/update-task/:taskId', updateTask);
Taskrouter.post('/:taskId/assign', assignTask);
Taskrouter.post('/add-task/:projectId', addTaskToProject);
Taskrouter.delete('/delete-task/:taskId', deleteTask);
Taskrouter.get('/:taskId/comments', getTaskComments);
Taskrouter.post('/:taskId/comments', postTaskComment);
Taskrouter.post('/generate-tasks', GenerateTasks);
export default Taskrouter;