import express from "express";
import { User, validate } from "../model/user.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import validObjectId from "../middleware/validObjectId.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// Create user
router.post("/", async (req, res) => {
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
});

// Get all users
router.get("/", admin, async (req, res) => {
  const users = await User.find().select("-password -__v");
  res.status(200).send({ data: users });
});

// Get user by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password-__v");
  res.status(200).send({ data: user });
});
export default router;
