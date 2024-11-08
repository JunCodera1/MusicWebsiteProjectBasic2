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

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

const app = express(); // Create Express app

// Apply rate limiting and CORS middleware globally
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
  })
);

app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/auth", authRoutes);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
); // Protect with JWT
app.use("/api/login", authRoutes); // Login route
app.use("/song", songRoutes); // Song Routes
app.use("/playlist", playlistRoutes); // Playlist Routes
app.use("/api", searchRoutes); // Search Routes

// Passport JWT Strategy
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
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

// Connect to database and start server
const PORT = process.env.PORT || 5000;
console.log("MongoDB URI:", process.env.MONGODB_URI);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

// Error handling middleware for express-async-errors
