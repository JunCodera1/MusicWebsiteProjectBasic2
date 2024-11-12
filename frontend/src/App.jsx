import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import FavouritesPage from "./pages/FavouritesPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoggedInHomePage from "./pages/LoggedInHomePage.jsx";
import MySongPage from "./pages/MySongPage.jsx";
import SongContext from "./components/SongContext.jsx";

import "./index.css";

const App = () => {
  const [cookie] = useCookies(["token"]);
  const isAuthenticated = !!cookie.token;
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <Router>
      <Box
        minH={{
          base: "100vh",
          sm: "100vh",
          md: "163vh",
          lg: "120vh",
          xl: "100vh",
          "2xl": "110vh",
        }}
        minW={{
          base: "107vw",
          sm: "100vw",
          md: "162vw",
          lg: "118vw",
          xl: "90vw",
          "2xl": "100vw",
        }}
        bg={useColorModeValue("white", "gray.800")}
        h={{ md: "70vh" }}
        mx="auto"
      >
        {isAuthenticated ? (
          <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            <Routes>
              <Route path="/" element={<LoggedInHomePage />} />
              <Route path="/mysongs" element={<MySongPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SongContext.Provider>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Box>
    </Router>
  );
};

export default App;
