import React, { useState } from "react";
import { Drawer, Box, Typography, Divider, Button, IconButton, Modal, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { avatar_links } from "../assets/Links/Avatar.js";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function ProfileDrawer({ open, setOpen }) {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarIndex ?? 0);
  const [confirming, setConfirming] = useState(false);
  const avatarUrl = user && user.avatarIndex !== undefined
    ? avatar_links[user.avatarIndex % avatar_links.length]
    : avatar_links[0];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const handleAvatarSelect = (idx) => {
    setSelectedAvatar(idx);
    setConfirming(true);
  };

  const handleAvatarUpdate = async () => {
    try {
      const res = await axios.put(`/api/user/update-avatar/${user.id}`, { avatarIndex: selectedAvatar });
      let updatedUser;
      if (res.data && res.data.user) {
        updatedUser = res.data.user;
      } else {
        updatedUser = { ...user, avatarIndex: selectedAvatar };
      }
      // This will now correctly update the global state
      setUser(updatedUser); 
      // This ensures the change persists on page refresh
      localStorage.setItem("user", JSON.stringify(updatedUser)); 
      
      setSelectedAvatar(updatedUser.avatarIndex);
      setConfirming(false);
      // This will now execute and close the modal
      setAvatarModalOpen(false); 
    } catch (err) {
      console.error("Failed to update avatar:", err);
    }
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
        <Box className="flex flex-col items-center mb-6" sx={{ position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#e0e7ff",
              zIndex: 2,
            }}
            onClick={() => setAvatarModalOpen(true)}
            size="small"
          >
            <EditIcon />
          </IconButton>
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
      <Modal
        open={avatarModalOpen}
        onClose={() => {
          setAvatarModalOpen(false);
          setConfirming(false);
        }}
        aria-labelledby="choose-avatar-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            minWidth: 320,
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" mb={2} align="center">
            Choose Your Avatar
          </Typography>
          <Grid container spacing={2}>
            {avatar_links.map((link, idx) => (
              <Grid item xs={3} key={idx}>
                <IconButton
                  onClick={() => handleAvatarSelect(idx)}
                  sx={{
                    border: selectedAvatar === idx ? "2px solid #2563eb" : "2px solid transparent",
                    borderRadius: "50%",
                    p: 0.5,
                  }}
                >
                  <img
                    src={link}
                    alt={`Avatar ${idx + 1}`}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          {confirming && (
            <Box mt={3} textAlign="center">
              <img
                src={avatar_links[selectedAvatar]}
                alt="Selected Avatar"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  marginBottom: 16,
                  objectFit: "cover",
                }}
              />
              <Typography mb={2}>
                Are you sure you want to update your avatar?
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAvatarUpdate}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setConfirming(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Drawer>
  );
}