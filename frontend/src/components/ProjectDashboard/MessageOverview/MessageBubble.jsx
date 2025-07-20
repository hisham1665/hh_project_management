import React from "react";
import { Avatar, Typography } from "@mui/material";
import { avatar_links } from "../../../assets/Links/Avatar";

const MessageBubble = ({ msg, user }) => {
  const isMe = msg.sender?._id === user.id || msg.sender === user.id;
  const senderObj = msg.sender || msg.senderObj || {};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        marginBottom: 16,
      }}
    >
      {!isMe && (
        <Avatar
          src={
            typeof senderObj.avatarIndex === "number"
              ? avatar_links[senderObj.avatarIndex]
              : undefined
          }
          alt={senderObj.name}
          sx={{ width: 36, height: 36, mr: 1 }}
        >
          {senderObj.name?.[0]?.toUpperCase() || "U"}
        </Avatar>
      )}
      <div
        style={{
          maxWidth: "60%",
          background: isMe ? "#dbeafe" : "#f3f4f6",
          color: "#222",
          borderRadius: 12,
          padding: "12px 16px",
          alignSelf: isMe ? "flex-end" : "flex-start",
          position: "relative",
        }}
      >
        <Typography fontWeight={500} fontSize={14} mb={0.5}>
          {isMe ? "You" : senderObj.name || "User"}
        </Typography>
        <Typography fontSize={15}>{msg.content}</Typography>
      </div>
      {isMe && (
        <Avatar
          src={
            typeof user.avatarIndex === "number"
              ? avatar_links[user.avatarIndex]
              : undefined
          }
          alt={user.name}
          sx={{ width: 36, height: 36, ml: 1 }}
        >
          {user.name?.[0]?.toUpperCase() || "U"}
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;