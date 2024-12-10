import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) newCode[i] = pastedCode[i] || "";
      setCode(newCode);

      const nextIndex = newCode.findIndex((digit) => !digit);
      inputRefs.current[nextIndex !== -1 ? nextIndex : 5]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit)) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
    { label: "Premium", uri: "/payment" },
    { label: "Store", uri: "/store" },
  ];

  const menuItemsRight = [{ label: "Sign Up", uri: "/signup" }];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-md mt-16 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          Enter the 6-digit verification code sent to your email address.
        </p>

        {/* Verification Code Inputs */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-2xl text-center bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Didn't receive the code?{" "}
          <span
            className="text-green-400 font-semibold cursor-pointer hover:underline"
            onClick={() => toast.success("Verification code resent!")}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
