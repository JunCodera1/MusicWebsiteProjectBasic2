import mongoose from "mongoose";

const likedSongSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến User Schema
    required: true,
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song", // Tham chiếu đến Song Schema
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now, // Tự động thêm ngày giờ khi người dùng thích bài hát
  },
});

// Đảm bảo mỗi người dùng chỉ có thể thích một bài hát một lần
likedSongSchema.index({ userId: 1, songId: 1 }, { unique: true });

const Liked = mongoose.model("Liked", likedSongSchema);
export default Liked;
