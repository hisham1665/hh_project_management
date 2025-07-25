import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const priorities = ["low", "medium", "high", "very-high"];
const statuses = ["todo", "in-progress", "done", "dropped"];

export default function TaskEntry({ tasks, onChange }) {
  const [userOptions, setUserOptions] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const {user} = useAuth();
  const handleTaskChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    onChange(updated);
  };

  const addTask = () => {
    onChange([
      ...tasks,
      {
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: new Date(),
        createdBy: "",
        assignedTo: user.id || null,
      },
    ]);
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUserSearch = async (query) => {
    if (!query) return;
    setLoadingUser(true);
    try {
      const res = await axios.get(`/api/user/search?q=${query}`,{
          headers: { Authorization: `Bearer ${user.token}` },
        });
      setUserOptions(res.data || []);
    } catch (err) {
      setUserOptions([]);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        className="space-y-6 overflow-y-auto"
        sx={{
          maxHeight: 350,
          pr: 1,
        }}
      >
        {tasks.map((task, index) => (
          <Box
            key={index}
            className="border border-gray-200 rounded-lg p-4"
            sx={{ bgcolor: "white" }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Title"
                value={task.title}
                onChange={(e) =>
                  handleTaskChange(index, "title", e.target.value)
                }
              />
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Description"
                value={task.description}
                onChange={(e) =>
                  handleTaskChange(index, "description", e.target.value)
                }
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  value={task.priority}
                  onChange={(e) =>
                    handleTaskChange(index, "priority", e.target.value)
                  }
                >
                  {priorities.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>

                <DatePicker
                  label="Due Date"
                  value={task.dueDate}
                  onChange={(newValue) =>
                    handleTaskChange(index, "dueDate", newValue)
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={task.status}
                  onChange={(e) =>
                    handleTaskChange(index, "status", e.target.value)
                  }
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              {/* Assignee field with suggestions */}
              <Autocomplete
                fullWidth
                options={userOptions}
                loading={loadingUser}
                getOptionLabel={(option) => option.name || ""}
                value={task.assignedTo || null}
                onChange={(_, newValue) =>
                  handleTaskChange(index, "assignedTo", newValue)
                }
                onInputChange={(_, value, reason) => {
                  if (reason === "input") handleUserSearch(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assign to User"
                    variant="outlined"
                  />
                )}
              />
              <Box display="flex" justifyContent="end">
                <IconButton onClick={() => removeTask(index)} color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="end" mt={3}>
        <IconButton onClick={addTask} color="primary">
         <span className="font-bold text-xl mr-3">Add Task</span> <AddCircle fontSize="large" /> 
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}
