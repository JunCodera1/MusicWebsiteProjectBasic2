import React from "react";

const SingleSongCard = () => {
  return (
    <div
      className="flex items-center p-4 hover:bg-gray-700 rounded-xl shadow-lg  transition duration-200 ease-in-out"
      style={{
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8)", // Shadow rõ và đậm hơn
        width: "82vw",
      }}
    >
      <div
        className="w-16 h-16 bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(https://f4.bcbits.com/img/a3054479666_65)`,
        }}
      ></div>

      <div className="flex flex-col justify-center pl-4 w-full">
        <div className="text-lg font-semibold text-white">Nothing Lasts</div>
        <div className="text-sm text-gray-300">Bedroom</div>
      </div>

      <div className="ml-auto text-md text-gray-400">6:14</div>
    </div>
  );
};

export default SingleSongCard;
