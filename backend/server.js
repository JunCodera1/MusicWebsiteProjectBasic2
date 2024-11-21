import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import playlistRoutes from "./routes/playlists.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./model/user.js";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

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
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.use(express.urlencoded({ extended: true }));

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

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import route Stripe
import stripePaymentRoute from './routes/stripePayment.js';
app.use('/api/stripe', stripePaymentRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to database and start server
const PORT = process.env.PORT || 8083;
console.log("MongoDB URI:", process.env.MONGODB_URI);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

// Error handling middleware for express-async-errors