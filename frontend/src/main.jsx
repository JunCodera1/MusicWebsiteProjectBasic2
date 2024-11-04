import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkId = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(clerkId);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ClerkProvider publishableKey={clerkId}>
    <React.StrictMode>
      <ChakraProvider>
        <App />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={true}
          closeButton={false}
          theme="colored"
          icon={false}
        />
      </ChakraProvider>
    </React.StrictMode>
  </ClerkProvider>
);
