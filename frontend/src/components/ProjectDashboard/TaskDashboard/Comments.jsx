import React, { useEffect, useState, useRef } from "react";
import { Typography, TextField, Button, CircularProgress, Avatar } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext"; // Add this import
import { avatar_links } from "../../../assets/Links/Avatar";
function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const { user } = useAuth(); // Get current user

  // Fetch comments for the task
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/task/${taskId}/comments`);
        setComments(res.data.comments || []);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [taskId]);

  // Scroll to bottom when comments change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  // Post a new comment
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setPosting(true);
    setError("");
    try {
      const res = await axios.post(`/api/task/${taskId}/comments`, {
        userId: user.id, // <-- send userId
        text: commentText,
      });
      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (err) {
      setError("Failed to post comment.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Comments
      </Typography>
      <div
        ref={scrollRef}
        style={{
          maxHeight: 220,
          overflowY: "auto",
          marginBottom: 24,
          paddingRight: 4,
        }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 120 }}>
            <CircularProgress size={28} />
          </div>
        ) : comments.length === 0 ? (
          <Typography color="text.secondary" align="center" mt={2}>
            No comments yet.
          </Typography>
        ) : (
          comments.map((c, idx) => (
            <div key={c._id || idx} style={{ display: "flex", alignItems: "flex-start", marginBottom: 18 }}>
              <Avatar
                src={
                  typeof c.user?.avatarIndex === "number"
                    ? avatar_links[c.user.avatarIndex]
                    : undefined
                }
                alt={c.user?.name}
                sx={{ width: 36, height: 36, mr: 2 }}
              >
                {c.user?.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Typography fontWeight={600} fontSize={15} color="text.primary">
                    {c.user?.name || "User"}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}
                  </Typography>
                </div>
                <Typography fontSize={14} color="text.secondary" mt={0.5}>
                  {c.comment}
                </Typography>
              </div>
            </div>
          ))
        )}
      </div>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#f6f8fa",
          borderRadius: 8,
          padding: "8px 12px",
        }}
        onSubmit={e => {
          e.preventDefault();
          handlePostComment();
        }}
      >
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={posting}
          sx={{
            bgcolor: "#f6f8fa",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f6f8fa",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={posting || !commentText.trim()}
          sx={{
            minWidth: 80,
            borderRadius: 2,
            boxShadow: "none",
            textTransform: "none",
            bgcolor: "#2563eb",
          }}
        >
          {posting ? <CircularProgress size={18} /> : "Send"}
        </Button>
      </form>
      {error && (
        <Typography color="error" fontSize={13} mt={1}>
          {error}
        </Typography>
      )}
    </div>
  );
}

export default Comments;