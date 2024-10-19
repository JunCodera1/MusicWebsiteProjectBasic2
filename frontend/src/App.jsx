import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Thêm import cho Router, Routes và Route
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <Box minH={"100vh"}>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
