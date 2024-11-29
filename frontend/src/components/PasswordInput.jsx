import { Input } from "@chakra-ui/react";
import React from "react";

const PasswordInput = ({ label, placeholder, className, value, setValue }) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label
        htmlFor={label}
        className="font-semibold text-base md:text-lg lg:text-xl"
      >
        {label}
      </label>
      <Input
        type="password"
        placeholder={placeholder}
        className="p-2 md:p-3 border-3 bg-black border-gray-400 rounded w-full placeholder-gray-500 text-sm md:text-base lg:text-lg "
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        border={"1px"}
      />
    </div>
  );
};

export default PasswordInput;
