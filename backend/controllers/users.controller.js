import { User, validate } from "../model/user.model.js";

import bcrypt from "bcrypt";
import passport from "passport";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("_id");
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
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
};

export const getUserById = async (req, res) => {
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
};

export const createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(403)
      .send({ message: "User with given email already exists!" });
  }
  // Hash password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const newUser = new User({
    ...req.body,
    password: hashPassword,
  });

  await newUser.save(); // Save User to DB

  newUser.password = undefined; // Hide password
  newUser.__v = undefined; // Hide key

  // Send response
  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
};
