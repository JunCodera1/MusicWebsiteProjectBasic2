import { transporter } from "./nodemailer.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Service",
      html: `<p>Hi ${name},</p><p>Welcome to our platform!</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Password reset success email sent successfully:",
      info.messageId
    );
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Error sending password reset success email");
  }
};
