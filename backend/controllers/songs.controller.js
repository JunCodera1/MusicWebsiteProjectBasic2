import { Song } from "../model/song.model.js";

export const createSong = async (req, res) => {
  const { name, thumbnail, track } = req.body;
  if (!name || !thumbnail || !track) {
    return res
      .status(400)
      .json({ err: "Insufficient details to create song." });
  }
  const artist = req.user._id; // Assuming the user is authenticated
  const songDetails = { name, thumbnail, track, artist };
  try {
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  } catch (err) {
    console.error("Error creating song:", err);
    return res.status(500).json({ err: "Error creating song." });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artist"); // Lấy tất cả bài hát, không phân biệt người dùng
    return res.status(200).json({ data: songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSongByArtistId = async (req, res) => {
  const { artistId } = req.params;
  // We can check if the artist does not exist
  const artist = await User.findOne({ _id: artistId });
  // ![] = false
  // !null = true
  // !undefined = true
  if (!artist) {
    return res.status(301).json({ err: "Artist does not exist" });
  }

  const songs = await Song.find({ artist: artistId });
  return res.status(200).json({ data: songs });
};

export const getSongById = async (req, res) => {
  const { songId } = req.params;

  try {
    // Fetch song details based on songId
    const song = await Song.findById(songId); // Replace with your actual database query

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(song); // Return song details
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSongById = async (req, res) => {
  const { songName } = req.params;

  try {
    const updatedSong = await Song.findOneAndUpdate(
      { name: songName },
      { $set: req.body },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).send({ message: "Song not found" });
    }

    return res
      .status(200)
      .send({ data: updatedSong, message: "Song updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteSongById = async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }
  res.status(200).send({ data: song, message: "Song deleted successfully" });
};

export const getSongByName = async (req, res) => {
  const { songName } = req.params;

  try {
    // Sử dụng regex để tìm kiếm bài hát có tên chứa songName
    const songs = await Song.find({
      name: { $regex: songName, $options: "i" }, // "i" là tùy chọn để tìm kiếm không phân biệt chữ hoa chữ thường
    }).populate("artist");

    return res.status(200).json({ data: songs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error searching songs" });
  }
};

export const getSongFeed = async (req, res) => {
  try {
    // Tìm tất cả bài hát trong likedSongs của người dùng
    const songs = await Song.find({
      _id: { $in: req.user.likedSongs },
    }).populate("artist");
    return res.status(200).json({ data: songs });
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeSong = async (req, res) => {
  const { id } = req.params; // Song ID
  const { userId } = req.body; // User ID from request body

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    if (song.likedBy.includes(userId)) {
      return res.status(200).json({ message: "Song already liked.", song });
    }

    // Nếu bài hát chưa có lượt thích, khởi tạo likes với giá trị mặc định là 0
    if (!song.likes) {
      song.likes = 0;
    }

    // Cập nhật likes và danh sách likedBy
    song.likes += 1;
    song.likedBy.push(userId);
    await song.save();

    res.status(200).json({
      message: "Song liked successfully.",
      likes: song.likes,
      likedBy: song.likedBy,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid song ID." });
    }

    console.error("Error liking the song:", error);
    res.status(500).json({ message: "Error liking the song.", error });
  }
};

export const unlikeSong = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    if (!song.likedBy.includes(userId)) {
      return res
        .status(200)
        .json({ message: "Song is not liked by this user.", song });
    }

    // Update likes and likedBy array
    song.likes = Math.max(0, song.likes - 1); // Prevent negative likes
    song.likedBy = song.likedBy.filter((id) => id !== userId);
    await song.save();

    res.status(200).json({
      message: "Song unliked successfully.",
      likes: song.likes,
      likedBy: song.likedBy,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid song ID." });
    }

    res.status(500).json({ message: "Error unliking the song.", error });
  }
};
