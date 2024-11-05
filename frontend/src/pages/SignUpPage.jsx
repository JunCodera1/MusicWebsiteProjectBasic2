import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

const SignUpPage = () => {
  const [email, setEmail] = useState("");

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label={"Confirm your email address"}
          placeholder={"Confirm Your Email Address"}
          className="mb-6"
        />
        <TextInput
          label={"Username"}
          placeholder={"Enter Your Username"}
          className="mb-6"
        />
        <PasswordInput label={"Password"} placeholder={"Enter Your Password"} />
        <br />
        <TextInput
          label={"What should we call you?"}
          placeholder={"Enter Your Profile Name"}
          className="mb-6"
        />

        <div className="w-full flex items-center justify-between space-x-8">
          <TextInput
            label={"First Name"}
            placeholder={"Enter Your First Name"}
            className="my-6"
          />
          <TextInput
            label={"Last Name"}
            placeholder={"Enter Your Last Name"}
            className="my-6"
          />
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <button className="bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full">
            SIGN UP
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-bold text-lg">Already have an account ?</div>
        <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full hover:bg-indigo-400">
          <a href="/login">LOG IN INSTEAD</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
