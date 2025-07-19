import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button as MuiButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const EditTaskModal = ({ open, onClose, task, members, onSave }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "todo");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [priority, setPriority] = useState(task.priority || "low");
  const statusOptions = ["todo", "in-progress", "done", "dropped"];
  const priorityOptions = ["low", "medium", "high", "very-high"];

  const handleSave = () => {
    onSave({
      title,
      description,
      status,
      dueDate,
      priority,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          className="bg-white rounded-xl w-full max-w-md mx-auto outline-none"
          sx={{
            p: { xs: 2, sm: 4 },
            boxShadow: 3,
            position: "absolute",
            top: { xs: "10%", sm: "15%" }, // Move modal up
            left: "50%",
            transform: "translate(-50%, 0)",
            maxHeight: { xs: "80vh", sm: "85vh" },
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Edit Task</h2>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: { xs: 2, sm: 3 } }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: { xs: 2, sm: 3 } }}
          />
          <TextField
            label="Status"
            fullWidth
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Due Date"
            value={dueDate ? new Date(dueDate) : null}
            onChange={(newValue) => setDueDate(newValue)}
            slotProps={{ textField: { fullWidth: true, sx: { mb: { xs: 2, sm: 3 } } } }}
            renderInput={(params) => (
              <TextField {...params} />
            )}
          />
          <TextField
            label="Priority"
            fullWidth
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div className="flex justify-end gap-2 mt-4">
            <MuiButton onClick={onClose} variant="outlined">
              Cancel
            </MuiButton>
            <MuiButton onClick={handleSave} variant="contained">
              Save
            </MuiButton>
          </div>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
};

const Actions = ({ task, members, onTaskUpdated }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mark as complete
  const handleMarkComplete = async () => {
    try {
      await axios.put(`/api/task/update-task/${task._id}`, { status: "done" });
      if (onTaskUpdated) onTaskUpdated();
      navigate(-1);
    } catch (err) {
      // handle error
    }
  };

  // Delete task with confirmation
  const handleDelete = async () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/task/delete-task/${task._id}`);
      setConfirmOpen(false);
      if (onTaskUpdated) onTaskUpdated();
      navigate(-1);
    } catch (err) {
      setConfirmOpen(false);
      // handle error
    }
  };

  // Edit task
  const handleEditSave = async (data) => {
    try {
      await axios.put(`/api/task/update-task/${task._id}`, {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        priority: data.priority,
      });
      if (onTaskUpdated) onTaskUpdated();
      navigate(-1);
    } catch (err) {
      // handle error
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Actions</h2>
      {task.status !== "done" && (<button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mb-3 transition"
        onClick={handleMarkComplete}
        >
        Mark as Complete
      </button>)
      }
      <button
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg mb-3 transition"
        onClick={() => setEditOpen(true)}
      >
        Edit Task
      </button>
      <button
        className="w-full bg-gray-100 hover:bg-red-100 text-gray-800 font-semibold py-2 rounded-lg transition"
        onClick={handleDelete}
      >
        Delete Task
      </button>
      <EditTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={task}
        members={members}
        onSave={handleEditSave}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setConfirmOpen(false)} variant="outlined">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Actions;
