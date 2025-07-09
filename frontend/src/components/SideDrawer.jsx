import React from "react";
import { Drawer, Box, Typography, Divider, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { avatar_links } from "../assets/Links/Avatar.js";

export default function ProfileDrawer({ open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const avatarUrl = user && user.avatarIndex !== undefined
    ? avatar_links[user.avatarIndex % avatar_links.length]
    : avatar_links[0];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: 320, borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }
      }}
    >
      <Box className="flex flex-col h-full p-6">
        <Box className="flex flex-col items-center mb-6">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="rounded-full size-20 mb-3"
            loading="lazy"
          />
          <Typography variant="h6" className="font-bold mb-1">
            {user?.name || "User"}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {user?.email || ""}
          </Typography>
        </Box>
        <Divider className="mb-4" />
        <Box className="flex-1">
          {/* Add more profile content here if needed */}
          <Typography variant="body2" className="text-gray-600">
            Welcome to your profile drawer! 🎉
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          className="mt-8 rounded-full font-bold"
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}