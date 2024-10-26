import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Login user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  // Check if user exists
  try {
    /// Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    // Generate token
    const token = user.generateAuthToken();
    // Send response
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

export default router;
