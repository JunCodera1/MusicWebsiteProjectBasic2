import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/songs.route.js";
import playlistRoutes from "./routes/playlists.route.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./model/user.model.js";
import rateLimit from "express-rate-limit";
import path from "path";

// Load environment variables from .env file
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}
const PORT = process.env.PORT || 5000;

const app = express(); // Create Express app
const __dirname = path.resolve();

// Apply rate limiting and CORS middleware globally
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the frontend to connect
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods,
    credentials: true, // Include credentials if needed (cookies, etc.)
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
  })
);

app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.use(express.json({ limit: "25mb" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// Passport JWT Strategy
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; // Thay thế bằng secret key của bạn

// Định nghĩa strategy đầu tiên

passport.use(
  "jwt-strategy-1",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Định nghĩa strategy thứ hai (nếu cần)
passport.use(
  "jwt-strategy-2",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT Payload for strategy 2:", jwt_payload);
    try {
      const user = await User.find({ id: jwt_payload.sub });
      console.log("User found for strategy 2:", user);
      if (user) {
        return done(null, user);
      } else {
        console.warn("User not found for strategy 2:", jwt_payload.sub);
        return done(null, false);
      }
    } catch (err) {
      console.error("Error during authentication for strategy 2:", err);
      return done(err, false);
    }
  })
);

// Connect to the database and start the server
console.log("MongoDB URI:", process.env.MONGODB_URI);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

// Error handling middleware for express-async-errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
