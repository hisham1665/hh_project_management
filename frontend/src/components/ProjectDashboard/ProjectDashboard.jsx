// Dashboard.jsx
import React, { use, useEffect, useState } from "react";
import ProjectOverview from "./ProjectOverview/ProjectOverview";
import { FaTasks, FaUsers, FaHome, FaBars, FaTimes, FaRocketchat } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskOverviewPage from "./TaskOverview/TaskOverview";
import MembersOverview from "./MemberOverview/MembersOverview";
import MessageOverview from "./MessageOverview/MessageOverview";
const NAVBAR_HEIGHT = 70;

const tabVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const { project, allProjects } = location.state || {};
  const navigate = useNavigate();

  if (!project) {
    const handleBack = () => {
      navigate("/dashboard");
    };
    return (
      <div className="text-red-500 text-center p-4">
        Project data not found. Please go back and reselect a project.
        <button onClick={handleBack} className="text-blue-500 hover:underline ml-2">
          Dashboard
        </button>
      </div>
    );
  }

  // Add a local refresh trigger for tasks
  const [refreshTasks, setRefreshTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (project && project._id) {
        try {
          const response = await axios.get(`/api/task/project/${project._id}`);
          const memberResponse = await axios.get(
            `/api/project/members/${project._id}`
          );
          setMembers(memberResponse.data.members || []);
          setTasks(response.data || []);
        } catch (err) {
          console.error("Failed to fetch tasks:", err);
        }
      } else {
        return;
      }
    };
    fetchTasks();
  }, [location, refreshTasks, project._id]);

  // Handler to trigger task refresh after add
  const handleTaskAdded = () => {
    setRefreshTasks((prev) => !prev);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <ProjectOverview project={project} tasks={tasks} members={members}  />
        );
      case "tasks":
        return (
          <TaskOverviewPage
            project={project}
            tasks={tasks}
            onTaskAdded={handleTaskAdded}
            members={members}
          />
        );
      case "members":
        return <MembersOverview project={project} members={members} onMembersEdited={handleTaskAdded}/>;
      case "messages":
        return <MessageOverview projectId={project._id} />;
      default:
          return null;
    }
  };

  return (
    <div
      className="flex w-screen overflow-hidden"
      style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
    >
      {/* Sidebar for desktop */}
      <aside
        className={`
          w-64 bg-white shadow-md p-4 flex-col gap-4 h-full z-10
          hidden md:flex
        `}
      >
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "overview"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <FaHome /> Overview
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "tasks"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          <FaTasks /> Tasks
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "members"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("members")}
        >
          <FaUsers /> Members
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "messages"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("messages");
          }}
        >
          <FaRocketchat/> Messages
        </button>
      </aside>

      {/* Sidebar for mobile (drawer style) */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <button
          className="p-2 rounded-md bg-blue-600 text-white shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={22} />
        </button>
      </div>
      <div
        className={`
    absolute left-0 w-full z-30 transition-opacity duration-200
    ${sidebarOpen ? "" : "pointer-events-none"}
  `}
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          background: sidebarOpen ? "rgba(255,255,255,0.5)" : "transparent",
          backdropFilter: sidebarOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: sidebarOpen ? "blur(6px)" : "none",
        }}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col gap-4 z-40
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
        style={{
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          top: NAVBAR_HEIGHT,
        }}
      >
        <button
          className="self-end mb-4 p-2 rounded-md bg-gray-100 text-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes size={20} />
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "overview"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("overview");
            setSidebarOpen(false);
          }}
        >
          <FaHome /> Overview
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "tasks"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("tasks");
            setSidebarOpen(false);
          }}
        >
          <FaTasks /> Tasks
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "members"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("members");
            setSidebarOpen(false);
          }}
        >
          <FaUsers /> Members
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
            activeTab === "messages"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("messages");
            setSidebarOpen(false);
          }}
        >
          <FaRocketchat/> Messages
        </button>
      </aside>

      {/* Main Content with framer-motion animation */}
      <main className="flex-1 h-full overflow-y-auto bg-[#F9FBFD] p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProjectDashboard;
