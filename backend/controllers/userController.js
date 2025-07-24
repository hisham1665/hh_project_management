import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register (Sign Up)
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'member', // fallback if not passed
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });


    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Send response
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarIndex: user.avatarIndex,
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const SearchUser = async (req, res) => {
  const q = req.query.q || "";
  const users = await User.aggregate([
    {
      $search: {
        index: "userSearch",
        autocomplete: {
          query: q,
          path: "name",
          fuzzy: { maxEdits: 1 },
        },
      },
    },
    { $limit: 10 },
  ]);
  res.json(users);
}

export const updateAvatarIndex = async (req, res) => {
  const { id } = req.params; // <-- change here
  const { avatarIndex } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id, // <-- use id here
      { avatarIndex },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password from the returned user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // The CORRECTED response: a nested object with only the changed data
    res.json({
      message: "Avatar updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarIndex: user.avatarIndex,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => {
  // The user's ID is attached to req.user by the auth middleware
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old and new passwords are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      // This case is unlikely if auth middleware is working, but it's good practice
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password.' });
    }

    // Hash the new password and update the user
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });

  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

