import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch,
  Box,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AddTask from "./AddTask";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB");
};
const getTaskBgColor = (status) => (status === "done" ? "#dcfce7" : "#e0f2fe");
const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "very-high": return "error";
    case "high": return "warning";
    case "medium": return "info";
    case "low": return "success";
    default: return "default";
  }
};

const TaskTable = ({ tasks, onTaskAdded, members }) => {
  const { user } = useAuth();
  const location = useLocation();
  const projectId = location.state?.project?._id || tasks[0]?.project || "no-task";
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedToMe, setAssignedToMe] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "In Progress" && task.status !== "in-progress") return false;
    if (statusFilter === "Completed" && task.status !== "done") return false;
    if (statusFilter === "Not Completed" && task.status === "done") return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (assignedToMe && task.assignedTo?._id !== user.id) return false;
    return true;
  });

  return (
    <div className="w-full">
      <Box
        className="flex flex-col lg:flex-row justify-between gap-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
          <Stack direction="row" spacing={1} className="flex-wrap">
            {["All", "In Progress", "Completed", "Not Completed"].map((label) => (
              <Button
                key={label}
                variant={statusFilter === label ? "contained" : "outlined"}
                size="small"
                onClick={() => setStatusFilter(label)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  backgroundColor: statusFilter === label ? "#3b82f6" : "#f1f5f9",
                  color: statusFilter === label ? "#fff" : "#1e293b",
                  ":hover": { backgroundColor: "#e2e8f0" },
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>
          <FormControl size="small" className="min-w-[150px]">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="very-high">Very High</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1} alignItems="center">
            <Switch
              checked={assignedToMe}
              onChange={(e) => setAssignedToMe(e.target.checked)}
            />
            <Typography fontSize="0.9rem">Assigned to Me</Typography>
          </Stack>
        </div>

        <div className="flex justify-end">
          <AddTask projectId={projectId} onTaskAdded={onTaskAdded} />
        </div>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          overflowX: "auto", 
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Task Name</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Assignee</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 ? (
              [...filteredTasks].reverse().map((task, idx) => (
                <TableRow key={idx} hover onClick={() => { navigate(`task/${task._id}`, { state: { task, projectId,members } }) }}>
                  <TableCell
                    sx={{
                      backgroundColor: getTaskBgColor(task.status),
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                    }}
                  >
                    {task.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: getTaskBgColor(task.status),
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                    }}
                  >
                    <Chip
                      label={task.priority?.toUpperCase() || "UNKNOWN"}
                      color={getPriorityColor(task.priority)}
                      variant="filled"
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell
                    className="text-blue-600 cursor-pointer hover:underline"
                    sx={{
                      backgroundColor: getTaskBgColor(task.status),
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                    }}
                  >
                    {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: getTaskBgColor(task.status),
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                    }}
                  >
                    {formatDate(task.dueDate)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No tasks match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskTable;
