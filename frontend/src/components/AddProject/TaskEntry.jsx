import React from "react";
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

const priorities = ["low", "medium", "high", "very-high"];
const statuses = ["todo", "in-progress", "done", "dropped"];

export default function TaskEntry({ tasks, onChange }) {
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
      },
    ]);
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    onChange(updated);
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
          <AddCircle fontSize="large" />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}
