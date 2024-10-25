import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";


const SignIn = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton className="bg-blue-500 text-white px-4 py-2 rounded" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default SignIn;
