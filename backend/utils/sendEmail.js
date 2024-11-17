import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Người gửi
    to: email, // Người nhận
    subject, // Tiêu đề email
    text: message, // Nội dung email
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
