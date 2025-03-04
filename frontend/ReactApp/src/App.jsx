import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/register" element={<AdminSignup />} />


      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
