import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import CloudinaryUploadAvatar from "../components/CloudinaryUploadAvatar";
import { useAuthStore } from "../store/authStore";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
  { label: "Store", uri: "/store" },
];

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Emails do not match, please try again.");
      return;
    }

    try {
      await signup(email, password, name, avatarUrl);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-white">
      <Navbar menuItemsLeft={menuItemsLeft} />
      <div className="flex flex-col items-center mt-10">
        <div className="logo p-5 flex justify-center">
          <GiMusicSpell size={100} className="text-green-500" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Create Account
            </h2>

            {/* Avatar Upload Centered */}
            <div className="flex flex-col items-center">
              <CloudinaryUploadAvatar setAvatarUrl={setAvatarUrl} />
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full mt-4 border-2 border-green-400"
                />
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
              <Input
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Mail}
                type="email"
                placeholder="Confirm Email Address"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthMeter password={password} />
              {error && (
                <p className="text-red-500 font-semibold mt-2 text-center">
                  {error}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 hover:underline transition"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
