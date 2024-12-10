import express from "express";

import {
  createUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
} from "../controllers/users.controller.js";

const router = express.Router();
// Get all user
router.get("/get/users", getAllUsers);

// Get Logged-In User Details Route
router.get(
  "/get/users/me",
  getCurrentUser
  // passport.authenticate("jwt-strategy-1", { session: false }),
);

// Get User by ID Route
router.get(
  "/get/users/:userId",
  getUserById
  // passport.authenticate("jwt-strategy-1", { session: false }),
);

// Create user
router.post("/", createUser);

export default router;
