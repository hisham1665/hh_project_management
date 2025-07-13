import { Box, Typography, Avatar, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ProjectList = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedProjectId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/project/deleteProject/${selectedProjectId}`);
      setProjects((prev) => prev.filter((proj) => proj._id !== selectedProjectId));
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setOpenDialog(false);
      setSelectedProjectId(null);
    }
  };

  return (
    <div className="space-y-6 cursor-pointer">
      {[...projects].reverse().map((proj, i) => (
        <motion.div
          key={proj._id || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Box
            className="bg-white rounded-xl p-6 shadow border border-gray-200 relative"
            onClick={() => navigate(`project/${proj._id}`, { state: { project: proj, allProjects: projects } })}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                handleDeleteClick(proj._id);
              }}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <DeleteIcon color="error" />
            </IconButton>

            <Typography variant="h6" className="!text-blue-800 !font-bold">
              {proj.name}
            </Typography>
            <Typography variant="body2" className="text-gray-700 mt-1">
              {proj.description}
            </Typography>
            <div className="flex items-center mt-4">
              <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} className="!bg-blue-200 !text-blue-800">
                {proj.createdBy?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <Typography variant="body2" className="ml-2 text-gray-600 pl-2">
                Created by: {proj.createdBy?.name || "Unknown"}
              </Typography>
            </div>
          </Box>
          {i < projects.length - 1 && <Divider className="!my-6" />}
        </motion.div>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this project?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectList;
