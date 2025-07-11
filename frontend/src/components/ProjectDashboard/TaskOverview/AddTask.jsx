import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
function AddTask() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default AddTask;
