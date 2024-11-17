import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // To display error message
  const navigate = useNavigate();

  // Function to send a password reset email
  const sendResetPasswordEmail = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError(""); // Clear any previous error

    const data = { email };
    const response = await makeUnAuthenticatedPOSTRequest(
      "/auth/forgotPassword",
      data
    );

    if (response && !response.err) {
      alert("Check your email for a password reset link");
      navigate("/login"); // Redirect to login after request is made
    } else {
      alert("Failed to send password reset email. Please try again.");
    }
  };

  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
  ];

  const menuItemsRight = [{ label: "Sign Up", uri: "/signup" }];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6">Send email to reset your password</div>

        <TextInput
          label={"Enter your email address"}
          placeholder={"Email address"}
          className="my-6"
          value={email}
          setValue={setEmail}
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="w-full flex items-center justify-center my-8">
          <button
            className="bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              sendResetPasswordEmail();
            }}
          >
            Send
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

export default ForgotPasswordPage;
