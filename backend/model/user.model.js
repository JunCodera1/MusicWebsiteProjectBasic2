import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcryptjs";

// Create user schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, private: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    likedSongs: { type: [String], default: [] },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    subscribedArtists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
    // Các trường mới cho việc reset mật khẩu
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
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
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    username: Joi.string().min(5).required().label("Username"),
    avatar: Joi.string().uri().label("Avatar"),
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
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
