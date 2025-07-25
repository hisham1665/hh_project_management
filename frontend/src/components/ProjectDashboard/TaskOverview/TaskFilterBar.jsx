import React from "react";
import { Button, Stack } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TuneIcon from "@mui/icons-material/Tune";

const TaskFilterBar = () => {
  return (
    <Stack direction="row" spacing={1} className="flex-wrap">
      {["All Tasks", "In Progress", "Completed", "Overdue"].map((label) => (
        <Button
          key={label}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            backgroundColor: "#f1f5f9",
            margin: "2px",
            ":hover": { backgroundColor: "#e2e8f0" },
          }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default TaskFilterBar;
