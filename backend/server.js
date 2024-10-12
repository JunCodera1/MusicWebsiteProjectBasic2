import express from "express";
import dotenv from "dotenv";

const app = express();

app.get("/", (req, res) => {});

console.log(process.env.MONGODB_URI);

app.listen(5000, () => {
  console.log("Server started at https://localhost:5000 hello");
});