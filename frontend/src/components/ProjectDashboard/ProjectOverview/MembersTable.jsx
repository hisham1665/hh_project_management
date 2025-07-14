import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { avatar_links } from "../../../assets/Links/Avatar";
import axios from "axios";

function MembersTable({ members, project , onMembersEdited }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [open, setOpen] = useState(false);
  const {user} = useAuth();
  const handleCellClick = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };
  const handleRemove = async () => {
    try {
      const res = await axios.post(`/api/project/remove-member/${project._id}`, {
        memberId: selectedMember.user._id,
      });
      if (res.status === 200) {
        alert("Member removed successfully");
        
      } else {
        alert("Failed to remove member");
      }
    } catch (error) {
      alert("Failed to remove member");
    }
    setSelectedMember(null);
    onMembersEdited();
    setOpen(false);
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Sl No</strong>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Role</strong>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Email</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(members) &&
              members.map((member, idx) => (
                <TableRow key={idx} hover onClick={() => handleCellClick(member)} sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ py: 2, px: 3 }}>{idx + 1}</TableCell>
                  <TableCell sx={{ py: 2, px: 3 }}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        sx={{
                          bgcolor: "#3b82f6",
                          width: 32,
                          height: 32,
                          fontSize: 14,
                        }}
                      >
                        {member?.user?.name?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                      <span>{member?.user?.name || "No name"}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 3 }}>
                    {member.role || "No role assigned"}
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 3, color: "text.secondary" }}>
                    {member?.user?.email || "No email provided"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Dialog */}
       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center">
          <Typography variant="h6">Member Details</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Stack alignItems="center" spacing={3} mt={1}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: 36,
                  bgcolor: "#3b82f6",
                }}
                src={
                  selectedMember.user.avatarIndex !== undefined &&
                  avatar_links[selectedMember.user.avatarIndex]
                    ? avatar_links[selectedMember.user.avatarIndex]
                    : undefined
                }
              >
                {(!selectedMember.user.avatarIndex && selectedMember.user.name?.[0]?.toUpperCase()) || "U"}
              </Avatar>
              <Typography variant="h6">{selectedMember.user.name}</Typography>
              <Stack spacing={1} width="100%" maxWidth="400px">
                <Box>
                  <Typography variant="subtitle2">Email:</Typography>
                  <Typography color="text.secondary">{selectedMember.user.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Role:</Typography>
                  <Typography color="text.secondary">
                    {selectedMember.role || "No role assigned"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 4, pb: 3 }}>
          {selectedMember && selectedMember.role !== "admin" && user.role === "admin" && (
          <Button onClick={handleRemove} color="error" variant="contained">
            Remove Member
          </Button>)}
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MembersTable;
