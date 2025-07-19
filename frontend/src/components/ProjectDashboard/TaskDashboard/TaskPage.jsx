import { Chip, Container, IconButton, useMediaQuery } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import TaskDetailsCard from "./Details";
import Actions from "./Actions";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "very-high":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "success";
    default:
      return "default";
  }
};

function TaskPage() {
  const { state } = useLocation();
  const task = state?.task || {};
  const projectId = state?.projectId || "no-project";
  const members = state?.members || [];
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  if (!task) return <div className="text-center mt-20">No task data found</div>;
  console.log("TaskPage", task, projectId);

  if (isMdUp) {
    // Desktop & large screen layout (original)
    return (
      <div className="flex flex-row w-full px-6 gap-6 mt-10">
        {/* Main content and comments in left column */}
        <div className="flex flex-col w-full lg:w-2/3">
          <Container className="w-full">
            <div className="mb-6 flex items-center">
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  mr: 2,
                  bgcolor: "#e0e7ff",
                  color: "#2563eb",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "#c7d2fe" },
                }}
                size="large"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <h1 className="text-4xl font-bold mb-3">Task: {task.title}</h1>
              <Chip
                label={task.priority?.toUpperCase() || "UNKNOWN"}
                color={getPriorityColor(task.priority)}
                variant="outlined"
                size="small"
                sx={{ fontWeight: 500, ml: 2 }}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Description</h3>
              <p className="text-gray-800">
                {task.description || "No description provided."}
              </p>
            </div>
          </Container>

          {/* Comments directly below description */}
          <Container className="w-full mt-6">
            <Comments taskId={task._id} />
          </Container>
        </div>

        {/* Right section: Sidebar with details */}
        <Container maxWidth="lg" className="w-full lg:w-1/3 justify-items-end">
          <TaskDetailsCard
            assigneed={task.assignedTo}
            priority={task.priority}
            dueDate={task.dueDate}
          />
          <Actions task={task} members={members} />
        </Container>
      </div>
    );
  }

  // Mobile layout: details & actions below main, then comments
  return (
    <div className="flex flex-col w-full px-4 gap-4 mt-8">
      <Container className="w-full">
        <div className="mb-6 flex items-center">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              mr: 2,
              bgcolor: "#e0e7ff",
              color: "#2563eb",
              boxShadow: 1,
              "&:hover": { bgcolor: "#c7d2fe" },
            }}
            size="large"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <h1 className="text-2xl font-bold mb-3">Task: {task.title}</h1>
          <Chip
            label={task.priority?.toUpperCase() || "UNKNOWN"}
            color={getPriorityColor(task.priority)}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 500, ml: 2 }}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <p className="text-gray-800">
            {task.description || "No description provided."}
          </p>
        </div>
      </Container>

      {/* Details and actions below main info */}
      <Container maxWidth="lg" className="w-full mt-2">
        <TaskDetailsCard
          assigneed={task.assignedTo}
          priority={task.priority}
          dueDate={task.dueDate}
        />
        <Actions task={task} members={members} />
      </Container>

      {/* Comments at the very bottom */}
      <Container className="w-full mt-4">
        <Comments taskId={task._id} />
      </Container>
    </div>
  );
}

export default TaskPage;
