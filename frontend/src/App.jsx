import React from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";

import Navbar from "./components/Navbar";

import { Box, useColorModeValue } from "@chakra-ui/react";
import FeedPage from "./pages/FeedPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import FavouritesPage from "./pages/FavouritesPage";
import TrendingPage from "./pages/TrendingPage";

const App = () => {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/favourites" element={<TrendingPage />} />
      </Routes>
    </Box>
  );
};

export default App;