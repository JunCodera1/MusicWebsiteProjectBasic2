import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; // Import crypto để tạo token
import sendEmail from "../utils/sendEmail.js"; // Import hàm sendEmail
import getToken from "../utils/helpers.js"; // Import hàm getToken
import CryptoJS from "crypto-js";
import axios from "axios";
import moment from "moment";

const router = express.Router();

// This POST route will help to register a user
router.post("/register", async (req, res) => {
  // This code is run when the /register api is called as a POST request

  // My req.body will be of the format {email, password, firstName, lastName, username }
  const { email, password, firstname, lastname, username } = req.body;

  // Step 2 : Does a user with this email already exist? If yes, we throw an error.
  const user = await User.findOne({ email: email });
  if (user) {
    // status code by default is 200
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  // This is a valid request

  // Step 3: Create a new user in the DB
  // Step 3.1 : We do not store passwords in plain text.
  // xyz: we convert the plain text password to a hash.
  // xyz --> asghajskbvjacnijhabigbr
  // My hash of xyz depends on 2 parameters.
  // If I keep those 2 parameters same, xyz ALWAYS gives the same hash.
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstname,
    lastname,
    username,
    avatar,
  };
  const newUser = await User.create(newUserData);
  console.log(newUserData);

  // Step 4: We want to create the token to return to the user
  const token = await getToken(email, newUser);

  // Step 5: Return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  console.log(userToReturn);
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // Step 1: Get email and password sent by user from req.body
  const { email, password } = req.body;

  // Step 2: Check if a user with given email exists. If not, the credentials are invalid
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  console.log(user);

  // Step 3: If the user exists, check if the password is correct. If not, the credentials are invalid
  // This is a tricky step. Why? Because we have stored the original password in a hashed form, which we cannot use to get back the password.
  // I cannot do : if(password === user.password)
  // bcrypt.compare enabled us to compare 1 password in plaintext(password from req.body) to a hashed password(the one in our db) securely
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // This will return true if the password is correct
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // Step 4: If the credentials are valid, we create a token and return it to the user
  const token = await getToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

// This POST route will help to forgot password
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist" });
    }

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token trước khi lưu vào cơ sở dữ liệu (tăng bảo mật)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Lưu token và thời gian hết hạn vào user document
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // Token hết hạn sau 15 phút
    await user.save();

    // Gửi email với đường dẫn reset password
    const resetURL = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;
    const message = `You requested a password reset. Please use the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent!",
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res
      .status(500)
      .json({ error: "Failed to process the request. Try again later." });
  }
});

// Reset Password Route
router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("Hashed token:", hashedToken); // In ra để kiểm tra giá trị hash của token

    // Tìm user với token khớp và token chưa hết hạn
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    console.log("User found:", user); // Kiểm tra lại user tìm thấy

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Cập nhật mật khẩu mới và xóa token reset
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
});

// Payment route
const config = {
  app_id: process.env.ZALOPAY_APP_ID,
  key1: process.env.ZALOPAY_KEY1,
  key2: process.env.ZALOPAY_KEY2,
  endpoint: process.env.ZALOPAY_ENDPOINT,
};
router.post("/payment", async (req, res) => {
  try {
    console.log("Received POST /payment request");
    console.log("Request body:", req.body);

    const { app_user, amount, item } = req.body;

    // Ensure required fields are provided
    if (
      !amount ||
      !app_user ||
      !item ||
      !Array.isArray(item) ||
      item.length === 0
    ) {
      return res.status(400).json({
        error: "Missing or invalid required fields",
        message:
          "Please provide 'amount', 'app_user', and 'item' as a non-empty array.",
      });
    }

    // Generate transaction ID
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;

    const order = {
      app_id: config.app_id,
      app_trans_id: app_trans_id,
      app_user,
      app_time: Math.floor(Date.now()), // Timestamp in milliseconds
      amount: parseInt(amount, 10),
      item: JSON.stringify(item), // Stringify item array
      description: `<Tên Merchant/Dịch vụ> - Thanh toán đơn hàng #${app_trans_id}`,
      embed_data: JSON.stringify({
        redirecturl: "http://localhost:8080/success",
      }), // Stringify embed_data
    };

    // Generate the string for MAC creation
    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    console.log("Generated data for MAC:", data);

    // Generate MAC
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    console.log("Generated MAC:", order.mac);

    // Make the POST request to ZaloPay
    const result = await axios.post(config.endpoint, order);

    console.log("ZaloPay response:", result.data);

    // Check the response from ZaloPay
    if (result.data.return_code !== 1) {
      return res.status(400).json({
        error: result.data.return_message,
        message: result.data.sub_return_message,
      });
    }

    res.status(200).json(result.data);
  } catch (error) {
    console.error("Payment error:", error);

    let errorMessage = "Payment processing failed.";
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }

    res.status(500).json({
      error: "Payment processing failed",
      message: errorMessage,
    });
  }
});

export default router;
