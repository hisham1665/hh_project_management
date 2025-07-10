import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  Stack,
  Divider,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import MembersTable from "./MembersTable";
import ProgressChartSection from "./ProgressChartSection";


const dummyMembers = [
  {
    name: "Sophia Clark",
    role: "Project Manager",
    responsibility: "Oversee project timelines and resources",
  },
  {
    name: "Ethan Carter",
    role: "Lead Developer",
    responsibility: "Manage development team and code quality",
  },
];



const ProjectOverview = ({project , tasks}) => {
  const [members, setMembers] = useState(dummyMembers);

  // Uncomment this and replace URL with real endpoint
  // useEffect(() => {
  //   axios.get('/api/members')
  //     .then(res => setMembers(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;
  const upcomingDeadlines = tasks.filter(
    (task) => new Date(task.deadline) > new Date()
  ).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);
  const recentActivities = tasks
    .filter((task) => task.assignedToMe)
    .slice(0, 5);

  return (
    <div className="p-6 bg-[#F9FBFD] min-h-screen w-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-1">Project : {project.name}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {project.description || "No description available for this project."}
      </p>

      {/* Progress & Chart Section */}
      <ProgressChartSection progress={progress} totalTasks={totalTasks} completedTasks={completedTasks} />
      {/* Recent Activities */}
      <div className="mb-8">
  <h2 className="text-lg font-bold mb-3">Recent Activities</h2>
  <div className="space-y-2">
    {tasks.map((task, idx) => {
      const priorityColor = {
        'very-high': 'bg-red-500 text-white',
        high: 'bg-orange-400 text-white',
        medium: 'bg-yellow-400 text-black',
        low: 'bg-green-400 text-white',
      }[task.priority || 'medium'];

      return (
        <div
          key={idx}
          className={`flex items-start gap-3 p-4 rounded-xl shadow-sm ${
            task.status === 'done' ? 'bg-green-50' : 'bg-blue-50'
          }`}
        >
          <div className="text-xl">
            {task.status === 'done' ? (
              <FaCheckCircle className="text-green-600 mt-1" />
            ) : (
              <FaPlusCircle className="text-blue-600 mt-1" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                {task.title }
              </p>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${priorityColor}`}
              >
                {task.priority || 'medium'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {task.status === 'done'
                ? `Completed task '${task.title}'`
                : `Added new task '${task.title}'`}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>

      {/* Team Members */}
     <MembersTable members={dummyMembers} />
     </div>
  );
};

export default ProjectOverview;
