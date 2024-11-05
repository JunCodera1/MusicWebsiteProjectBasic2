import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    };

    try {
      setLoading(true); // Set loading state
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
      );
      setLoading(false); // Reset loading state

      if (response && !response.error) {
        alert("Successfully signed up, please login to continue.");
        navigate("/login");
      } else {
        alert(response?.error || "Something went wrong, please try again.");
      }
    } catch (error) {
      setLoading(false); // Reset loading state
      console.error(error); // Log error for debugging
      alert("Failed to connect to the server, please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      signUp();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6 text-2xl">
          Sign up for free to start listening.
        </div>
        <TextInput
          label={"Email"}
          placeholder={"Enter Your Email Address"}
          className="my-6"
          value={email}
          setValue={setEmail}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          label={"Confirm your email address"}
          placeholder={"Confirm Your Email Address"}
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          label={"Username"}
          placeholder={"Enter Your Username"}
          className="mb-6"
          value={username}
          setValue={setUsername}
          onKeyDown={handleKeyDown}
        />
        <PasswordInput
          label={"Password"}
          placeholder={"Enter Your Password"}
          value={password}
          setValue={setPassword}
          onKeyDown={handleKeyDown}
        />
        <br />
        <TextInput
          label={"What should we call you?"}
          placeholder={"Enter Your Profile Name"}
          className="mb-6"
          value={profileName}
          setValue={setProfileName}
          onKeyDown={handleKeyDown}
        />

        <div className="w-full flex items-center justify-between space-x-4">
          <TextInput
            label={"First Name"}
            placeholder={"Enter Your First Name"}
            className="w-[48%]"
            value={firstName}
            setValue={setFirstName}
            onKeyDown={handleKeyDown}
          />
          <TextInput
            label={"Last Name"}
            placeholder={"Enter Your Last Name"}
            className="w-[48%]"
            value={lastName}
            setValue={setLastName}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="w-full flex items-center justify-center my-8">
          <button
            className={`bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-bold text-lg">Already have an account?</div>
        <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full hover:bg-indigo-400">
          <a href="/login">LOG IN INSTEAD</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
