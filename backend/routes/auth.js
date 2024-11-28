import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import getToken from "../utils/helpers.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import generateResetToken from "../utils/generateResetToken.js";

const router = express.Router();

// This POST route will help to register a user
router.post("/register", async (req, res) => {
  // This code is run when the /register api is called as a POST request

  // My req.body will be of the format {email, password, firstName, lastName, username }
  const { email, password, firstname, lastname, username, avatar } = req.body;

  // Step 2 : Does a user with this email already exist? If yes, we throw an error.
  const user = await User.findOne({ email: email });
  if (user) {
    // status code by default is 200
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  // This is a valid request

  // Step 3: Create a new user in the DB
  // Step 3.1 : We do not store passwords in plain text.
  // xyz: we convert the plain text password to a hash.
  // xyz --> asghajskbvjacnijhabigbr
  // My hash of xyz depends on 2 parameters.
  // If I keep those 2 parameters same, xyz ALWAYS gives the same hash.
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
  console.log(newUserData);

  // Step 4: We want to create the token to return to the user
  const token = await getToken(email, newUser);

  // Step 5: Return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  console.log(userToReturn);
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

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

// This POST route will help to forgot password
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = await generateResetToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Get the frontend URL from environment variables

    const frontendUrl = process.env.FRONTEND_URL;

    // Build the reset password link with the frontend URL
    const resetLink = `${frontendUrl}/resetPassword/${resetToken}`;

    // Send the reset link to the user via email
    sendEmail(user.email, resetLink);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error: " + error });
  }
});

// Reset Password Route
router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  console.log("User found:", user);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password in DB
  user.password = hashedPassword;
  user.passwordResetToken = undefined; // Clear the token after use
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

// Route trong auth.js
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
      res.json(user); // Return user data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/get/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userId } = req.params; // Get userId from route params

    try {
      // Find the user by userId
      const user = await User.findById(userId).select("username email avatar");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user); // Return the user data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
