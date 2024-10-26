import express from "express";
import dotenv from "dotenv";
// import path from "path";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

app.use(express.json()); // allow us to accept JSON data in the req.body


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*",(req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

console.log(process.env.MONGODB_URI);
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
