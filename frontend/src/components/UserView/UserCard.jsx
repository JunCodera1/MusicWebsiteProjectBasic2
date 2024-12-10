import React from "react";

const UserCard = ({
  username,
  avatar,
  bio,
  followersCount,
  playlistsCount,
}) => {
  return (
    <div className="bg-gray-800 text-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Avatar */}
      <div className="flex justify-center pb-4">
        <img
          src={avatar || "thumbnail"}
          alt={`${username}'s avatar`}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <div className="font-bold text-lg mb-1">{username || "Username"}</div>
        <div className="text-gray-400 text-sm">{bio || "Bio"}</div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-gray-300 text-sm mt-4">
        <div>
          <span className="font-bold text-white">
            {followersCount || "Followers"}
          </span>{" "}
          Followers
        </div>
        <div>
          <span className="font-bold text-white">
            {playlistsCount || "Playlists"}
          </span>{" "}
          Playlists
        </div>
      </div>
    </div>
  );
};

export default UserCard;
