import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5, // Giới hạn mỗi IP đến 5 yêu cầu đăng nhập trong 15 phút
    message: "Quá nhiều lần đăng nhập thất bại, vui lòng thử lại sau 15 phút",
});