import React from "react"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AccessRoute from "./components/AccessRoutes";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

import ProjectDashboard from "./components/ProjectDashboard/ProjectDashboard";
import TaskPage from "./components/ProjectDashboard/TaskDashboard/TaskPage";

function App() {

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<AccessRoute requireAuth={true} redirectTo="/404" ><MainLayout /></AccessRoute>} >
          <Route index element={<Dashboard />} />
          <Route path="project/:id" element={<ProjectDashboard/>} />
          <Route path="project/:id/task/:id" element={<TaskPage/>} />
        </Route> 
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
