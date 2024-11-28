import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import getToken from "../utils/helpers.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import generateResetToken from "../utils/generateResetToken.js";

const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname, username, avatar } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      username,
      avatar,
    };
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Step 1: Get email and password sent by user from req.body
    const { email, password } = req.body;

    // Step 2: Check if a user with given email exists. If not, the credentials are invalid
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    // Step 3: If the user exists, check if the password is correct. If not, the credentials are invalid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    // Step 4: If the credentials are valid, we create a token and return it to the user
    const token = await getToken(email, user); // Assuming getToken is a function that generates a JWT token
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password; // Don't send the password in the response

    // Send the response with user data and token
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});
// Forgot Password Route
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = await getToken(email, newUser);
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL;
    const resetLink = `${frontendUrl}/resetPassword/${resetToken}`;

    sendEmail(user.email, resetLink);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset mật khẩu sau khi xác minh token
router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    console.log("Token received:", token);

    // Tìm người dùng với token và kiểm tra xem token còn hạn hay không
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }, // Kiểm tra token còn hạn
    });

    // Kiểm tra xem người dùng có tồn tại và token hợp lệ hay không
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined; // Xóa token
    user.passwordResetExpires = undefined; // Xóa token expire

    // Lưu người dùng sau khi cập nhật mật khẩu
    await user.save();

    console.log("Password reset successfully");

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error during password reset:", err);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password" });
  }
});

// Get Logged-In User Details Route
router.get(
  "/get/users/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).select("username email avatar");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Get User by ID Route
router.get(
  "/get/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).select("username email avatar");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
