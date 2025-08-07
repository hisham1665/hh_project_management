import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import UserSearchField from "./UserSearchField";
import TaskEntry from "./TaskEntry";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const steps = ["Project Info", "Add Members", "Add Tasks"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddProjectModal({ open, handleClose,onSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuth();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    members: [],
    tasks: [],
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const projectRes = await axios.post("/api/project/create", {
        name: projectData.name,
        description: projectData.description,
        userId: user.id,
        members: projectData.members.map((m) => m._id),
      });

      const projectId = projectRes.data.project._id;
      for (const task of projectData.tasks) {
        await axios.post("/api/task/create", {
          ...task,
          projectId,
          createdBy: user.id,
        });
      }

      // Close and reset
      handleClose();
      resetForm();
    onSuccess();
    } catch (error) {
      console.error("Error creating project or tasks", error);
    }
  };

  const resetForm = () => {
    setActiveStep(0);
    setProjectData({
      name: "",
      description: "",
      members: [],
      tasks: [],
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <TextField
                label="Project Name"
                autoFocus
                fullWidth
                variant="outlined"
                value={projectData.name}
                onChange={(e) =>
                  setProjectData({ ...projectData, name: e.target.value })
                }
                className="!mb-4"
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
                className="!mb-4"
              />
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <UserSearchField
              selectedUsers={projectData.members}
              onChange={(members) =>
                setProjectData({ ...projectData, members })
              }
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TaskEntry
              tasks={projectData.tasks}
              onChange={(tasks) => setProjectData({ ...projectData, tasks })}
              projectName={projectData.name}
              projectDescription={projectData.description}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h5" className="mb-4 font-semibold text-gray-800">
            Create New Project
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel className="mb-6">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent()}

          <div className="flex justify-between mt-6">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              className="!bg-blue-600 hover:!bg-blue-700 text-white"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
