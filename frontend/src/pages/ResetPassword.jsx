import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import PasswordInput from "../components/PasswordInput";
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper"; // Ensure this function is working
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();

  // Function to reset the password
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = { password }; // Password being sent

    try {
      const response = await makeUnAuthenticatedPOSTRequest(
        `/auth/resetPassword/${token}`,
        data
      );
      console.log("Response:", response); // Check the response
      if (response && !response.err) {
        alert("Password reset successful");
        navigate("/login");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting the password.");
    }
  };

  const menuItemsLeft = [
    {
      label: "Home",
      uri: "/",
    },
    {
      label: "Feed",
      uri: "/feed",
    },
    {
      label: "Trending",
      uri: "/trending",
    },
    {
      label: "Upload",
      uri: "/upload",
    },
  ];

  const menuItemsRight = [
    {
      label: "Sign Up",
      uri: "/signup",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6">
          To continue, enter and confirm your new password
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <PasswordInput
          label={"Password"}
          placeholder={"Enter Your New Password"}
          value={password}
          setValue={setPassword}
        />

        <br />
        <PasswordInput
          label={"Confirm Password"}
          placeholder={"Confirm Your New Password"}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        <div className="w-full flex items-center justify-center my-8">
          <button
            className={`bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              resetPassword(); // Trigger resetPassword function
            }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300 "></div>
        <div className="my-6 font-bold text-lg">Don't have an account?</div>
        <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full hover:bg-indigo-400">
          <a href="/signup">SIGN UP FOR SOUNDBOX</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
