import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  gender: { type: String, require: true },
  month: { type: String, require: true },
  date: { type: String, require: true },
  year: { type: String, require: true },
  likedSongs: { type: [String], default: [] },
  playlists: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY,
    { expiresln: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    gender: Joi.string()
      .valid("male", "female", "non-binary")
      .required()
      .label("Gender"),
    month: Joi.string().required().label("Month"),
    date: Joi.string().required().label("Date"),
    year: Joi.string().required().label("Year"),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

export { User, validate };
