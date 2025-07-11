import express from 'express';
import { registerUser, loginUser, SearchUser } from '../controllers/userController.js';

const Userrouter = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
Userrouter.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user
Userrouter.post('/login', loginUser);
Userrouter.get("/search", SearchUser);


export default Userrouter;
