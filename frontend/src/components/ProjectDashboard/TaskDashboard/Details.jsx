import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 mb-4 last:mb-0">
    <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <div className="text-gray-800 font-medium text-[15px]">{label}</div>
      <div className="text-blue-500 text-[15px] font-normal">{value}</div>
    </div>
  </div>
);

const TaskDetailsCard = ({
  priority = "High",
  assigneed = { name: "John Doe" , email: "sample@gmail.com"},
  dueDate = "July 15, 2024",
}) => (
  <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs ">
    <h3 className="text-2xl font-bold mb-6">Details</h3>

    <InfoRow
      icon={<FlagOutlinedIcon className="text-gray-400"  fontSize="large"/>}
      label="Priority"
      value={priority}
    />
    <InfoRow
    
      icon={<GroupOutlinedIcon className="text-gray-400" fontSize="large" />}
      label="Assignees"
      value={assigneed.name}
    />
    <InfoRow
      icon={<CalendarMonthOutlinedIcon className="text-gray-400" fontSize="large" />}
      label="Due Date"
      value={dueDate || "No due date set"}
    />
  </div>
);

export default TaskDetailsCard;