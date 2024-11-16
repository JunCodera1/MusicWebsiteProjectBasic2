import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:8080");
});

// Error handling middleware for express-async-errors
