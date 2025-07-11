import express from 'express';
import { addMemberToProject, createProject, deleteProject, getProjectById, getProjectMembers, getUserProjects,removeMemberFromProject } from '../controllers/projectController.js';

const Projectrouter = express.Router();

Projectrouter.post("/create", createProject);
Projectrouter.get("/userProject/:userId", getUserProjects);
Projectrouter.get("/:projectId", getProjectById);
Projectrouter.post("/addMember/:projectId", addMemberToProject);
Projectrouter.delete("/deleteProject/:projectId", deleteProject);
Projectrouter.post("/:projectId/removeMember", removeMemberFromProject);
Projectrouter.get("/members/:projectId", getProjectMembers);

export default Projectrouter;