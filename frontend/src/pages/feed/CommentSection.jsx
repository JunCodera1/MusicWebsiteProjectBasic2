import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaShare, FaTrashAlt } from "react-icons/fa";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedDELETERequest,
} from "@/utils/serverHelper";

const CommentSection = ({ trackId }) => {
  const [comments, setComments] = useState([]); // State để lưu danh sách các bình luận
  const [newComment, setNewComment] = useState(""); // State cho nội dung bình luận mới

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `/comments/${trackId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [trackId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await makeAuthenticatedPOSTRequest(
        `/comments/${trackId}`,
        { text: newComment }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await makeAuthenticatedDELETERequest(`/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-section bg-gray-100 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Input field for new comment */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* List of comments */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
          >
            <p>{comment.text}</p>
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
