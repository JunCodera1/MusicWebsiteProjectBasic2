import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar"; // Import Navbar
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Sử dụng Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;