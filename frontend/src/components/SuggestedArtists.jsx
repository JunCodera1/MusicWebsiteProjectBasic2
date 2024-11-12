import React from "react";

export default function SuggestedArtists() {
  const artists = [
    { id: 1, name: "Artist 1", followers: "1.2M", avatar: "/avatar1.jpg" },
    { id: 2, name: "Artist 2", followers: "800K", avatar: "/avatar2.jpg" },
    { id: 3, name: "Artist 3", followers: "500K", avatar: "/avatar3.jpg" },
  ];

  return (
    <div className="w-80 p-6 bg-gray-900 border-l">
      <h2 className="text-lg font-semibold mb-4">Artists you should follow</h2>
      <div className="space-y-4">
        {artists.map((artist) => (
          <div key={artist.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{artist.name}</p>
                <p className="text-sm text-gray-500">
                  {artist.followers} followers
                </p>
              </div>
            </div>
            <button className="bg-transparent border border-orange-500 text-orange-500 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
