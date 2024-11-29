import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Alert = ({ children, type = "info", onClose }) => {
    const getTypeStyle = (type) => {
        switch (type) {
            case "success":
                return "bg-green-500 text-white";
            case "error":
                return "bg-red-500 text-white";
            case "warning":
                return "bg-yellow-500 text-black";
            case "info":
            default:
                return "bg-blue-500 text-white";
        }
    };

    return (
        <div
            className={`fixed top-5 right-5 max-w-sm w-full p-4 rounded shadow-lg flex items-start space-x-4 ${getTypeStyle(
                type
            )}`}
        >
            <div className="flex-1">{children}</div>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none"
            >
                <AiOutlineClose size={20} />
            </button>
        </div>
    );
};

const AlertTitle = ({ children }) => (
    <div className="font-bold text-lg">{children}</div>
);

const AlertDescription = ({ children }) => (
    <p className="text-sm mt-1">{children}</p>
);

export { Alert, AlertTitle, AlertDescription };

