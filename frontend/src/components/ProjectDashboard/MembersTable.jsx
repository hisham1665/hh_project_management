import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
function MembersTable({ members }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Team Members</h2>
      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Role</strong>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <strong>Responsibilities</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, idx) => (
              <TableRow key={idx} hover>
                <TableCell sx={{ py: 2, px: 3 }}>{member.name}</TableCell>
                <TableCell sx={{ py: 2, px: 3, color: "#2563eb" }}>
                  {member.role}
                </TableCell>
                <TableCell sx={{ py: 2, px: 3, color: "text.secondary" }}>
                  {member.responsibility}
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
