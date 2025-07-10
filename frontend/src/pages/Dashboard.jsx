import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProjectModal from "../components/AddProject/AddProjectModal"; // Import your modal
import { useAuth } from "../context/AuthContext";
import {
  Typography,
  Button,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false); // 🔁 Trigger re-fetch

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/project/userProject/${user?.id}`);
      setProjects(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchProjects();
  }, [user, refresh]); // 🔁 refresh state triggers update

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !text-white shadow"
              onClick={() => setOpenModal(true)}
            >
              Add New Project
            </Button>
          </motion.div>
        </div>

        {loading && <div className="p-4 text-blue-600 font-semibold">Loading...</div>}
        {error && <div className="p-4 text-red-500 font-semibold">{error}</div>}
        {!loading && !error && projects.length === 0 && (
          <div className="p-4 text-gray-500">No projects found.</div>
        )}

        <div className="space-y-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box className="bg-white rounded-xl p-6 shadow border border-gray-200"  onClick={() =>
                  navigate(`project/${proj._id}`, { state: { project: proj, allProjects: projects } })
                }> 
                <Typography variant="h6" className="!text-blue-800 !font-bold">
                  {proj.name}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mt-1">
                  {proj.description}
                </Typography>
                <div className="flex items-center mt-4">
                  <Avatar sx={{ width: 32, height: 32, fontSize: 14 }} className="!bg-blue-200 !text-blue-800">
                    {proj.createdBy?.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  <Typography variant="body2" className="ml-2 text-gray-600 pl-2">
                    Created by: {proj.createdBy?.name || "Unknown"}
                  </Typography>
                </div>
              </Box>
              {i < projects.length - 1 && <Divider className="!my-6" />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🧩 Modal here */}
      <AddProjectModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onSuccess={() => {
          setOpenModal(false);
          setRefresh((prev) => !prev); // 🔁 trigger re-fetch
        }}
      />
    </div>
  );
}
