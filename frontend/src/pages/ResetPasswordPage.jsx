import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
    { label: "Store", uri: "/store" },
  ];

  const menuItemsRight = [{ label: "Sign Up", uri: "/signup" }];

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Navbar */}
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      {/* Logo */}
      <div className="logo py-5 w-full flex justify-center">
        <GiMusicSpell size={100} className="text-green-500" />
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-70 shadow-xl rounded-xl p-8"
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your new password to regain access to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password Input */}
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
