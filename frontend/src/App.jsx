import React, { useState, useEffect } from "react";
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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword";
import PaymentPage from "./pages/PaymentPage";
import SearchPage from "./pages/SearchPage";
import PlaylistViewPage from "./pages/PlaylistViewPage";

const App = () => {
  const [cookie] = useCookies(["token"]);
  const isAuthenticated = !!cookie.token;

  // Load state from localStorage if available
  const storedSong = JSON.parse(localStorage.getItem("currentSong"));
  const storedIsPaused = JSON.parse(localStorage.getItem("isPaused"));

  const [currentSong, setCurrentSong] = useState(storedSong || null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(storedIsPaused || true);

  // Store current state to localStorage when it changes
  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
    }
    localStorage.setItem("isPaused", JSON.stringify(isPaused));
  }, [currentSong, isPaused]);

  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
      }}
    >
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
            base: "98vw",
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
            <Routes>
              <Route path="/" element={<LoggedInHomePage />} />
              <Route path="/mysongs" element={<MySongPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/playlistView" element={<PlaylistViewPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="/resetPassword" element={<ResetPasswordPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </Box>
      </Router>
    </SongContext.Provider>
  );
};

export default App;
