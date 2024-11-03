import React from "react";
import { GiMusicSpell } from "react-icons/gi";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>
      <div className="inputRegion">Text</div>
    </div>
  );
};

export default LoginPage;
