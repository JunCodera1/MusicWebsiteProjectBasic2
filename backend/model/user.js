import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcryptjs";

// Create user schema
const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, private: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    likedSongs: { type: [String], default: [] },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    subscribedArtists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
    // Các trường mới cho việc reset mật khẩu
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before storing it in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10); // Adjust salt rounds as necessary
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Validate user input using Joi
const validate = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).required().label("First Name"),
    lastname: Joi.string().min(2).required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    username: Joi.string().min(5).required().label("Username"),
    avatar: Joi.string().uri().label("Avatar"),
  });
  return schema.validate(user);
};

// Method to check if entered password matches the hashed password in the database
userSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create user model
const User = mongoose.model("User", userSchema);

export { User, validate };
