import React from "react";
import { Button, Typography, Box } from "@mui/material";


import TaskTable from "./TaskTable";

const TaskOverviewPage = ({project , tasks , onTaskAdded , members}) => {
  return (
    <Box className="bg-[#f8fafc] min-h-screen p-2 pr-6 rounded-3xl">
     <h1 className="text-3xl font-bold mb-1">Project : {`${project.name} Tasks `|| "NO Name"}</h1>
      <p className="text-md text-gray-600 mb-6">
        {project.description || "No description available for this project."}
      </p>

      <TaskTable tasks={tasks} onTaskAdded={onTaskAdded} members={members} />
    </Box>
  );
};

export default TaskOverviewPage;
