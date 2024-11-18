import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { useCookies } from "react-cookie";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import CloudinaryUploadAvatar from "../components/CloudinaryUploadAvatar"; // Import upload component
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // New state for avatar
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Emails do not match, please try again.");
      return;
    }
    if (!email || !username || !password || !firstName || !lastName) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      email,
      username,
      password,
      firstname: firstName,
      lastname: lastName,
      profileName,
      avatar: avatarUrl, // Include avatar URL
    };

    try {
      setLoading(true);
      const response = await makeUnAuthenticatedPOSTRequest(
        "/auth/register",
        data
      );
      setLoading(false);

      if (response && !response.error) {
        const token = response.token;
        const date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        setCookie("token", token, { path: "/", expires: date });
        alert("Successfully signed up. Redirecting to home page...");
        navigate("/");
      } else {
        alert(response?.error || "Something went wrong, please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Failed to connect to the server, please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6 text-2xl">
          Sign up for free to start listening.
        </div>
        <CloudinaryUploadAvatar setAvatarUrl={setAvatarUrl} />{" "}
        {/* Upload Button */}
        {avatarUrl && ( // Show avatar preview if available
          <img
            src={avatarUrl}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full mt-4"
          />
        )}
        <TextInput
          label={"Email"}
          placeholder={"Enter Your Email Address"}
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label={"Confirm your email address"}
          placeholder={"Confirm Your Email Address"}
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label={"Username"}
          placeholder={"Enter Your Username"}
          className="mb-6"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label={"Password"}
          placeholder={"Enter Your Password"}
          value={password}
          setValue={setPassword}
        />
        <br />
        <TextInput
          label={"What should we call you?"}
          placeholder={"Enter Your Profile Name"}
          className="mb-6"
          value={profileName}
          setValue={setProfileName}
        />
        <div className="w-full flex items-center justify-between space-x-4">
          <TextInput
            label={"First Name"}
            placeholder={"Enter Your First Name"}
            className="w-[48%]"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label={"Last Name"}
            placeholder={"Enter Your Last Name"}
            className="w-[48%]"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <br />
        <br />
        <button
          className={`bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={signUp}
          disabled={loading}
        >
          {loading ? "SIGNING UP..." : "SIGN UP"}
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
