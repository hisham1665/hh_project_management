import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import TaskEntry from "../../AddProject/TaskEntry";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { set } from "mongoose";
import { ta } from "date-fns/locale";

function AddTask({ projectId, onTaskAdded }) {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTasks([]);
  };

  const handleAddTask = async () => {
    try {
      // Set createdBy for each task before sending
      const tasksWithCreator = tasks.map((task) => ({
        ...task,
        createdBy: user.id,
        project: projectId,
      }));
      console.log("Adding tasks:", tasksWithCreator);
      await axios.post(`/api/task/add-task/${projectId}`, tasksWithCreator);
      if (onTaskAdded) onTaskAdded();
      handleClose();
    } catch (err) {
      console.error("Error adding tasks:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
          onClick={handleOpen}
        >
          Add Task 
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-task-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            width: { xs: "95vw", sm: 500, md: 600 },
            maxHeight: { xs: "90vh", sm: 600 },
            overflowY: "auto",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 12, right: 12 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="add-task-modal"
            variant="h6"
            fontWeight={700}
            mb={2}
            textAlign="center"
          >
            Add Tasks
          </Typography>
          <TaskEntry tasks={tasks} onChange={setTasks} />
          <Box display="flex" justifyContent="end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              disabled={tasks.length === 0}
              sx={{ minWidth: 120, borderRadius: 2 }}
            >
              Save Tasks
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddTask;
