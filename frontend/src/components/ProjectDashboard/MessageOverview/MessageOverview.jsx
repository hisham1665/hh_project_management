import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const socket = io();

function MessageOverview({ projectId }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null); 
  const { user } = useAuth();

  
  useEffect(() => {
    axios.get(`/api/message/get-messages/${projectId}`).then(res => {
      setMessages(res.data.reverse());
    });

    socket.emit("joinProject", projectId);

    socket.on("messageEvent", (data) => {
      if (data.type === "add") {
        setMessages(prev => [...prev, data.message]);
      }
      if (data.type === "delete") {
        setMessages(prev => prev.filter(msg => msg._id !== data.message._id));
      }
      if (data.type === "update") {
        setMessages(prev =>
          prev.map(msg => msg._id === data.message._id ? data.message : msg)
        );
      }
    });

    return () => {
      socket.off("messageEvent");
    };
  }, [projectId]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async (messageText) => {
    if (!messageText.trim()) return;
    await axios.post("/api/message/create", {
      projectId,
      content: messageText,
      userId: user.id,
    });
  };

  return (
    <div
      style={{
        background: "#F9FBFD",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center", // Center children horizontally
      }}
    >
      {/* Chat area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 16px 100px", // bottom padding for input space
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={msg._id || idx} msg={msg} user={user} />
        ))}
        <div ref={bottomRef} /> {/* 👇 Scroll anchor */}
      </div>

      {/* Fixed input bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "60%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 800, 
          background: "transparent",
          padding: "12px 16px",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 50,
        }}
      >
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default MessageOverview;
