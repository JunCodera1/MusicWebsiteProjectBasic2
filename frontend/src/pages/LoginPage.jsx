import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true); // Start loading when login is clicked
    const data = { email, password };
    const response = await makeUnAuthenticatedPOSTRequest("/auth/login", data);

    setLoading(false); // Stop loading after request

    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30); // Set cookie expiration for 30 days
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home"); // Redirect to home on successful login
    } else {
      alert(response?.err || "Login failed");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      login(); // Call login function on Enter key
    }
  };

  const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
    { label: "Premium", uri: "/payment" },
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
        <div className="font-bold mb-6">To continue, log in to Soundbox</div>
        <TextInput
          label={"Email ID or username"}
          placeholder={"Email address or username"}
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label={"Password"}
          placeholder={"Enter Your Password"}
          value={password}
          setValue={setPassword}
          onKeyDown={handleKeyDown} // Handle Enter key press for login
        />
        <div className="w-full flex flex-col items-end my-8">
          <button
            className={`bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "LOG IN"} {/* Show loading text */}
          </button>
          <Link
            to="/forgotPassword"
            className="mt-2 text-blue-500 hover:underline"
          >
            Forgot password? Get back this.
          </Link>
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

export default LoginPage;
