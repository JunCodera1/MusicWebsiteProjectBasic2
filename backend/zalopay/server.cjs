const express = require("express");
const axios = require("axios");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APP INFO

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
