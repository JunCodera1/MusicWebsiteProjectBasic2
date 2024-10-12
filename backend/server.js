import express from "express";

const app = express();

app.listen(5000, () => {
    console.log("Server started at https://localhost:5000 hello");
});