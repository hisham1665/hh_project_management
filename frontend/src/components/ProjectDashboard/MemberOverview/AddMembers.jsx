import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

function AddMembers({ project, onMembersEdited }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth(); 
  const handleOpen = () => {
    setOpen(true);
    setQuery('');
    setUsers([]);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Search users by query
  const handleSearch = async () => {
    setLoading(true);
    try {
        const res = await axios.get(`/api/user/search?q=${query}`,{
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Search results:', res);
      setUsers(res.data || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
    setLoading(false);
  };

  // Add selected user to project
  const handleAddMember = async () => {
    if (!selectedUser) return;
    try {
      await axios.post(`/api/project/addMember/${project._id}`, {
        memberId: selectedUser._id,
      });
      <Alert severity="success">Member added successfully!</Alert>;
      onMembersEdited?.(); // refresh parent
      handleClose();
    } catch (err) {
        <Alert severity="error">Failed to add member: {err.response?.data?.message || err.message}</Alert>;
      console.error('Add member failed:', err);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Add Members
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth   >
        <DialogTitle>Search & Add Member</DialogTitle>
        <Typography variant='subtitle2' color='textSecondary' sx={{ padding: '0 16px' }}> 
            search by name or email and hit enter to search
        </Typography>
        <DialogContent>
          <TextField
            fullWidth
            label="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            margin="normal"
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <List dense>
              {users.map((user) => (
                <ListItem
                  button
                  key={user._id}
                  selected={selectedUser?._id === user._id}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              ))}
              {!loading && users.length === 0 && query.length > 0 && (
                <Typography color="text.secondary" align="center" mt={2}>
                  No users found.
                </Typography>
              )}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMember} variant="contained" disabled={!selectedUser}>
            Add
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddMembers;
