import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
    { label: "Store", uri: "/store" },
  ];

  const menuItemsRight = [{ label: "Login", uri: "/login" }];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      {/* Logo */}
      <div className="p-5 mt-8">
        <GiMusicSpell size={100} className="text-green-400" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <>
              <p className="text-gray-300 mb-6 text-center">
                Enter your email address, and we'll send you a link to reset
                your password.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin mx-auto" />
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <div className="text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>

              {/* Success Message */}
              <p className="text-gray-300 mb-6">
                If an account exists for{" "}
                <span className="text-green-400">{email}</span>, you will
                receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link
            to="/login"
            className="text-sm text-green-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
