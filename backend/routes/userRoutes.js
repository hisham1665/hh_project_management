import express from 'express';
import { 
  registerUser, 
  loginUser, 
  SearchUser, 
  updateAvatarIndex, 
  changePassword // 1. Import the new controller
} from '../controllers/userController.js';
import auth from '../middleware/auth.js'; // 2. Import auth middleware

const Userrouter = express.Router();

// Public Routes
Userrouter.post("/register", registerUser);
Userrouter.post('/login', loginUser);

// Protected Routes - All require authentication
Userrouter.get("/search", auth, SearchUser);
Userrouter.put("/update-avatar/:id", auth, updateAvatarIndex); // 3. Secure this existing route
Userrouter.post("/change-password", auth, changePassword); // 4. Add the new protected route

export default Userrouter;
