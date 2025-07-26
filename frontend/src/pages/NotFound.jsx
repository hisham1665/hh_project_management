import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200">
      <Paper
        elevation={8}
        className="p-10 rounded-3xl flex flex-col items-center shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.95)",
          border: "2px solid #fbbf24",
          backdropFilter: "blur(6px)",
        }}
      >
        <SentimentVerySatisfiedIcon
          sx={{ fontSize: 90, color: "#f59e42", mb: 2, animation: "bounce 1.2s infinite" }}
          className="animate-bounce"
        />
        <Typography
          variant="h2"
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 mb-2"
        >
          404
        </Typography>
        <Typography
          variant="h5"
          className="font-bold text-gray-800 mb-4"
        >
          Oops! Page not found.
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 mb-10 text-center"
        >
          The page you’re looking for doesn’t exist.<br />
          But hey, don’t worry, you’re still awesome 🚀
        </Typography>
        <Button
          variant="contained"
          color="warning"
          size="large"
          className="mt-3 !rounded-full !font-bold !shadow-lg !bg-gradient-to-r !from-yellow-400 !to-pink-400 hover:!from-pink-400 hover:!to-yellow-400"
          onClick={() => navigate("/")}
        >
          Go Home &amp; Smile 😊
        </Button>
      </Paper>
    </Box>
  );
}