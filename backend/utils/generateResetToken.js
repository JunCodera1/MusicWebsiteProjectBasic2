import jwt from "jsonwebtoken";

const generateResetToken = async () => {
  try {
    const token = jwt.sign({ reset: true }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    return token;
  } catch (error) {
    console.error("Error generating reset token:", error);
    throw new Error("Error generating reset token");
  }
};

export default generateResetToken;
