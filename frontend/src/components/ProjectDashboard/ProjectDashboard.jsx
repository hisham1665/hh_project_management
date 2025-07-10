// Dashboard.jsx
import React, { useEffect, useState } from "react";
import ProjectOverview from "./ProjectOverview";
import { FaTasks, FaUsers, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ta } from "date-fns/locale";
const NAVBAR_HEIGHT = 70; // Adjust this value to match your navbar's height in px

const tabVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const { project, allProjects } = location.state || {};
  useEffect(() => {
    const fetchTasks = async () => {
      if (project && project._id) {
        try {
          const response = await axios.get(`/api/task/project/${project._id}`);
            setTasks(response.data || []);
        } catch (err) {
          console.error("Failed to fetch tasks:", err);
        }
      } else {
        return;
      }
    };
    fetchTasks();

  }, [location]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProjectOverview project={project} tasks={tasks} />;
      case "tasks":
        return <div className="p-6">loading...</div>;
      case "members":
        return <div className="p-6">div</div>;
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
      {/* Only blur the dashboard area, not the navbar */}
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
