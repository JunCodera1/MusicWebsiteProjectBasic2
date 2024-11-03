import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import FavouritesPage from "./pages/FavouritesPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage.jsx";

import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="w-screen h-screen">
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
