import { Chip, Container } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comments";
import TaskDetailsCard from "./Details";
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
  if (!task) return <div className="text-center mt-20">No task data found</div>;
  console.log("TaskPage", task, projectId);
  return (
   <div className="flex flex-col lg:flex-row w-full px-6 gap-6 mt-10">
  {/* Left section: Main Task Content */}
  <Container className="w-full lg:w-2/3 ">
    <div className="mb-6">
      <h1 className="text-4xl font-bold mb-3">Task: {task.title}</h1>
      <Chip
        label={task.priority?.toUpperCase() || "UNKNOWN"}
        color={getPriorityColor(task.priority)}
        variant="outlined"
        size="small"
        sx={{ fontWeight: 500 }}
      />
    </div>

    <div className="mb-6">
      <h3 className="text-2xl font-bold mb-4">Description</h3>
      <p className="text-gray-800">
        {task.description || "No description provided."}
      </p>
    </div>

    <Comments taskId={task._id} />
  </Container>

  {/* Right section: Sidebar with details */}
  <Container maxWidth="lg" className="w-full lg:w-1/3 justify-items-end">
    <TaskDetailsCard project={task.project} assigneed={task.assignedTo} priority={task.priority} dueDate={task.dueDate}/>
  </Container>
</div>

  );
}

export default TaskPage;
