import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { Button, Stack } from "@mui/material";

function MembersTable({ members }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Team Members</h2>
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
                <TableRow key={idx} hover>
                  <TableCell sx={{ py: 2, px: 3 }}>{idx + 1}</TableCell>
                  <TableCell sx={{ py: 2, px: 3 }}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        sx={{
                          bgcolor: "#3b82f6", // Tailwind blue-500
                          width: 32,
                          height: 32,
                          fontSize: 14,
                        }}
                      >
                        {member.name?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 3 }}>
                    {member.role || "No role assigned"}
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 3, color: "text.secondary" }}>
                    {member.email}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MembersTable;
