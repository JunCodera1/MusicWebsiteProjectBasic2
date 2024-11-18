import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

// Create user schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, private: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String, default: "" }, // Optional field for avatar URL
  likedSongs: { type: [String], default: [] },
  playlists: { type: [String], default: [] },
  subscribedArtists: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
});

// Validate user
const validate = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).required().label("First Name"),
    lastname: Joi.string().min(2).required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    username: Joi.string().min(5).required().label("Username"),
    avatar: Joi.string().uri().label("Avatar"), // Validate avatar URL if provided
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema); // Create user model

export { User, validate };
