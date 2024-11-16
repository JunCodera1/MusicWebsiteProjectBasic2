import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Hoặc dịch vụ email bạn dùng, ví dụ: "Outlook", "Yahoo"
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng hoặc OAuth2 token
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Người gửi
    to: email, // Người nhận
    subject, // Tiêu đề
    text: message, // Nội dung email
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
