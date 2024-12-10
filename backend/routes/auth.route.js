import express from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import getToken from "../utils/helpers.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/logout", logout);

router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// Registration Route
// router.post("/register", async (req, res) => {
//   const { email, password, username } = req.body;

//   // Check if a user with this email already exists
//   const user = await User.findOne({ email });
//   if (user) {
//     return res
//       .status(403)
//       .json({ error: "A user with this email already exists" });
//   }

//   // Hash the password before saving it
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUserData = { email, password: hashedPassword, username };
//   const newUser = await User.create(newUserData);

//   // Create token for the user
//   const token = getToken(newUser);

//   // Return user data along with the token
//   const userToReturn = { ...newUser.toJSON(), token };
//   delete userToReturn.password;
//   return res.status(200).json(userToReturn);
// });

// Login route

// Forgot Password Route
// router.post("/forgotPassword", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Generate a password reset token and set its expiration date
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     user.passwordResetToken = token;
//     user.passwordResetExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const frontendUrl = process.env.FRONTEND_URL;
//     const resetLink = `${frontendUrl}/resetPassword/${token}`;

//     sendEmail(user.email, resetLink);

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/resetPassword/:token", async (req, res) => {
//   const token = req.params.token;

//   try {
//     // Check if password is provided
//     const { password } = req.body;
//     if (!password) {
//       return res.status(400).json({ error: "Password is required" });
//     }

//     // Find the user associated with the token
//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: "Invalid or expired password reset token" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update the user's password and clear reset token
//     user.password = hashedPassword;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // Send email confirmation
//     const resetLink = `${process.env.CLIENT_URL}/login`;
//     sendEmail(user.email, resetLink);

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (err) {
//     console.error("Error during password reset:", err);
//     res
//       .status(500)
//       .json({ error: "An error occurred while resetting the password" });
//   }
// });

export default router;
