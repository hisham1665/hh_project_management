import express from 'express';
import { addMessage, deleteMessage, getMessages, updateMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.post("/create", addMessage);
messageRouter.get("/get-messages/:projectId", getMessages);
messageRouter.delete("/delete/:messageId", deleteMessage);
messageRouter.put("/update/:messageId", updateMessage);

export default messageRouter;