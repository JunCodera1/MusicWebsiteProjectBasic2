import express from "express";
import { User } from "../model/user.js";
import { Song, validate } from "../model/song.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validObjectId from "../middleware/validObjectId.js";

const router = express.Router();
