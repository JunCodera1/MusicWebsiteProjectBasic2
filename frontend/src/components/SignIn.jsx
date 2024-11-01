import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { Box } from "@chakra-ui/react";

const SignIn = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton className="sm">
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 px-4 py-2 rounded">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Box className="h-6" size="sm">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-9 w-9 ", // Adjusts avatar size
                userButtonPopoverCard: "p-4 bg-gray-100", // Adjust popover appearance
              },
            }}
          />
        </Box>
      </SignedIn>
    </header>
  );
};

export default SignIn;
