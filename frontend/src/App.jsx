import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import './index.css'; 

import Navbar from "./components/Navbar";


import { Box, useColorModeValue } from "@chakra-ui/react";
import FeedPage from "./pages/FeedPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";

const App = () => {
  return (
    <Router>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage/>}></Route>
          <Route path="/library" element={<LibraryPage/>}></Route>
          <Route path="/upload" element={<UploadPage/>}></Route>
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
