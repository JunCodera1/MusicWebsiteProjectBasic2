import React, { useState } from "react";
import { FaPlay, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { makeUnAuthenticatedPUTRequest } from "@/utils/serverHelper";
import CommentSection from "./CommentSection";

export default function TrackList({
  tracks,
  setCurrentTrack,
  setTracks,
  userId,
}) {
  const [expandedTrack, setExpandedTrack] = useState(null);

  const handleLikeToggle = async (trackId, isLiked) => {
    try {
      const endpoint = isLiked
        ? `/song/put/unlike/${trackId}`
        : `/song/put/like/${trackId}`;
      const response = await makeUnAuthenticatedPUTRequest(endpoint);

      // Update the UI or state with the new data
      setTracks((prevTracks) =>
        prevTracks.map((track) =>
          track._id === trackId ? { ...track, ...response } : track
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentToggle = (trackId) => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId);
  };

  return (
    <div className="space-y-6">
      {tracks.map((track) => {
        const isLiked = track.likedBy.includes(userId);
        const isExpanded = expandedTrack === track._id;

        return (
          <div key={track._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={track.thumbnail}
                alt={track.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{track.username}</p>
                <p className="text-sm text-gray-500">posted a track</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={track.thumbnail}
                alt={track.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                onClick={() => setCurrentTrack(track)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-4"
              >
                <FaPlay />
              </button>
            </div>
            <h2 className="text-xl font-semibold mt-4">{track.name}</h2>
            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={() => handleLikeToggle(track._id, isLiked)}
                className={`flex items-center space-x-1 ${
                  isLiked
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <FaHeart />
                <span>{track.likes}</span>
              </button>
              <button
                onClick={() => handleCommentToggle(track._id)}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-500"
              >
                <FaComment />
                <span>{track.comments?.length || 0}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-orange-500">
                <FaShare />
              </button>
            </div>
            {isExpanded && (
              <CommentSection
                trackId={track._id}
                comments={track.comments || []}
                setComments={(newComments) =>
                  setTracks((prevTracks) =>
                    prevTracks.map((t) =>
                      t._id === track._id ? { ...t, comments: newComments } : t
                    )
                  )
                }
                userId={userId}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
