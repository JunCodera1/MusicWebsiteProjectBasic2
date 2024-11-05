import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import playlistRoutes from "./routes/playlists.js";
import searchRoutes from "./routes/search.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./model/user.js";
import rateLimit from "express-rate-limit";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create Express app
var limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.use(express.json()); // Parse JSON bodies
app.use("/auth", authRoutes);
app.use(limiter);
app.use(cors()); // Enable CORS
app.use("/api/users", userRoutes); // User Routes
app.use("/api/login", authRoutes); // Auth Routes
app.use("/song", songRoutes); // Song Routes
app.use("/playlists", playlistRoutes); // Playlist Routes
app.use("/api/", searchRoutes); // Search Routes
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
const PORT = process.env.PORT || 5000; // Set port
console.log(process.env.MONGODB_URI); // Log MongoDB URI

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT); // Start server
});

// Error handling middleware passport-jwt
