import React, { useState } from "react";
import { TextField, Button, Icon } from "@mui/material";

const MessageInput = ({ onSend }) => {
  const [messageText, setMessageText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setPosting(true);
    await onSend(messageText);
    setMessageText("");
    setPosting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#f6f8fa",
        borderRadius: 8,
        padding: "12px 16px",
        margin: "0 24px",
      }}
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        disabled={posting}
        className="bg-white rounded-xl "
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={posting || !messageText.trim()}
        sx={{
          minWidth: 80,
          borderRadius: 2,
          boxShadow: "none",
          textTransform: "none",
          bgcolor: "#2563eb",
          "&:hover": { bgcolor: "#1d4ed8" },
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;