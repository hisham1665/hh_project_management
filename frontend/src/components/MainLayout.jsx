// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <Navbar />
      <div className="mx-auto px-4 ">
        <Outlet /> {/* All nested route components will render here */}
      </div>
    </div>
  );
}
