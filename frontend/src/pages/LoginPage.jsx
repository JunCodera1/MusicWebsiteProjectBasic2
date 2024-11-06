import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
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
        />
        <div className="w-full flex items-center justify-end my-8 ">
          <button
            className="bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full "
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOG IN
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

export default LoginPage;
