import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // Add this line
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Clear previous success
    setLoading(true);
    try {
      const response = await axios.post("/api/user/login", { email, password });
      if (response.status === 200) {
        login(response.data); 
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200); 
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-300"
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <Paper
            elevation={6}
            className="rounded-3xl px-8 py-12 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.98)",
              border: "1.5px solid #e0e7ff",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box className="text-center mb-8">
              <Typography
                variant="h4"
                className="font-extrabold text-blue-800 mb-2 tracking-wide"
              >
                Welcome Back
              </Typography>
              <Typography variant="subtitle1" className="text-indigo-600">
                Login to your HH Project account
              </Typography>
            </Box>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  className="bg-white rounded-lg"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="bg-white rounded-lg"
                />
              </Box>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 8px 24px #6366f133" }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  className="!rounded-full !py-3 !text-lg !font-bold !bg-gradient-to-r !from-indigo-500 !to-blue-500 hover:!from-blue-500 hover:!to-indigo-500 !shadow-lg transition"
                  sx={{
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #2563eb 100%)",
                    color: "#fff",
                  }}
                  startIcon={
                    loading && <CircularProgress size={22} color="inherit" />
                  }
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
              <Box mt={6} className="text-center">
                <Typography variant="body2" className="text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    href="/sign-up"
                    className="!text-indigo-700 hover:!underline !font-bold !p-0 !min-w-0"
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}