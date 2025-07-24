import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Add success state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Clear previous success message

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/user/register", formData);
      if (res.status === 201) {
        login(res.data.user);
        setSuccess("Account created successfully! Redirecting..."); 
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" fontWeight="bold" mb={1}>
          Create Account
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Start managing your projects today.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
              {success}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
          <Box textAlign="center">
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}