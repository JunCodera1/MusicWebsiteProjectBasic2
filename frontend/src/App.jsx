import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

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
import LoggedInHomePage from "./pages/LoggedInHomePage.jsx";

const App = () => {
  const [cookie] = useCookies(["token"]); // Không cần setCookie nếu không thay đổi token
  const isAuthenticated = !!cookie.token; // Kiểm tra xem token có tồn tại không

  return (
    <Router>
      <div className="w-screen h-screen">
        <Box
          minH={{
            base: "100vh", // 0px
            sm: "100vh", // ~480px. em is a relative unit and is dependant on the font-size.
            md: "163vh", // ~768px
            lg: "120vh", // ~992px
            xl: "100vh", // ~1280px
            "2xl": "110vh",
          }}
          minW={{
            base: "107vw", // 0px
            sm: "100vw", // ~480px. em is a relative unit and is dependant on the font-size.
            md: "162vw", // ~768px
            lg: "118vw", // ~992px
            xl: "90vw", // ~1280px
            "2xl": "100vw",
          }}
          bg={useColorModeValue("gray.100", "gray.900")}
          h={{ md: "70vh" }}
          mx="auto"
        >
          <Routes>
            {isAuthenticated ? (
              // Các route dành cho người dùng đã đăng nhập
              <>
                <Route path="/" element={<LoggedInHomePage />} />
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
