import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar/";

import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import FavouritesPage from "./pages/FavouritesPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useCookies } from "react-cookie";

import "./index.css";

const App = () => {
  const [cookie] = useCookies(["token"]); // Không cần setCookie nếu không thay đổi token
  const isAuthenticated = !!cookie.token; // Kiểm tra xem token có tồn tại không

  return (
    <Router>
      <div className="w-screen h-screen">
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <Navbar />
          <Routes>
            {isAuthenticated ? (
              // Các route dành cho người dùng đã đăng nhập
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                {/* Điều hướng tất cả các route không xác định đến trang chủ */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              // Các route dành cho người dùng chưa đăng nhập
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                {/* Điều hướng tất cả các route không xác định đến trang login */}
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
