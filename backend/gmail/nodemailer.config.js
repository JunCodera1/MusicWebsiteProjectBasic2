import nodemailer from "nodemailer";

// Cấu hình transporter
export const transporter = nodemailer.createTransport({
  service: "gmail", // Sử dụng dịch vụ Gmail
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
  },
});
