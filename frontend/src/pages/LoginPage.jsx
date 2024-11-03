import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-10">To countinue, log in to Soundbox</div>
        <TextInput
          label={"Email ID or username"}
          placeholder={"Email address or username"}
          className="my-6"
        />
        <PasswordInput label={"Password"} placeholder={"Password"} />
      </div>
    </div>
  );
};

export default LoginPage;
