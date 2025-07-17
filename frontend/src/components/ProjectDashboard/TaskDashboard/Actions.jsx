import React, { useState } from "react";
import { Modal, Box, TextField, Button as MuiButton } from "@mui/material";

// Dummy API functions (replace with your real API calls)
const markAsCompleteAPI = async (taskId) => {
  alert(`API: Marked task ${taskId} as complete`);
};
const deleteTaskAPI = async (taskId) => {
  alert(`API: Deleted task ${taskId}`);
};
const updateTaskAPI = async (taskId, data) => {
  alert(`API: Updated task ${taskId} with title "${data.title}"`);
};

const EditTaskModal = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white rounded-xl p-6 w-full max-w-md mx-auto mt-32 outline-none">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-4"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-2 mt-4">
          <MuiButton onClick={onClose} variant="outlined">Cancel</MuiButton>
          <MuiButton onClick={handleSave} variant="contained">Save</MuiButton>
        </div>
      </Box>
    </Modal>
  );
};

const Actions = ({ task }) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleMarkComplete = async () => {
    await markAsCompleteAPI(task._id);
  };

  const handleDelete = async () => {
    await deleteTaskAPI(task._id);
  };

  const handleEditSave = async (data) => {
    await updateTaskAPI(task._id, data);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Actions</h2>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mb-3 transition"
        onClick={handleMarkComplete}
      >
        Mark as Complete
      </button>
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
        onSave={handleEditSave}
      />
    </div>
  );
};

export default Actions;