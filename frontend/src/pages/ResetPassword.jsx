import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import PasswordInput from "../components/PasswordInput";
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { token } = useParams(); // Retrieve the token from the URL

  // Reset Password function
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = { password };
    const response = await makeUnAuthenticatedPOSTRequest(
      `/auth/resetPassword/${token}`,
      data
    );

    if (response && !response.err) {
      alert("Password reset successful");
      navigate("/login");
    } else {
      alert("Failed to reset password. Try again later.");
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
            className="bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              resetPassword(); // Trigger resetPassword function
            }}
          >
            Reset Password
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
