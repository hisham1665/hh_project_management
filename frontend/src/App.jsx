import React from "react"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Login"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
function App() {

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
       <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
