import React, { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { makeUnAuthenticatedPOSTRequest } from "../utils/serverHelper";
import Navbar from "../components/Navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "error", title: "Lỗi", description: "Mật khẩu không khớp. Vui lòng kiểm tra lại." });
      return;
    }

    setIsLoading(true);
    try {
      const response = await makeUnAuthenticatedPOSTRequest(
        `/auth/resetPassword/${token}`,
        { password }
      );

      if (response && !response.err) {
        setAlert({ type: "success", title: "Thành công", description: "Mật khẩu đã được đặt lại thành công." });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setAlert({ type: "error", title: "Lỗi", description: response.err || "Không thể đặt lại mật khẩu. Vui lòng thử lại sau." });
      }
    } catch (error) {
      console.error("Lỗi đặt lại mật khẩu:", error);
      setAlert({ type: "error", title: "Lỗi", description: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

  const menuItemsLeft = [
    { label: "Trang chủ", uri: "/" },
    { label: "Khám phá", uri: "/discover" },
  ];

  const menuItemsRight = [
    { label: "Đăng nhập", uri: "/login" },
    { label: "Đăng ký", uri: "/signup" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />

      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6 text-2xl">Đặt lại mật khẩu</div>

        <form onSubmit={resetPassword} className="w-full space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu mới"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Xác nhận mật khẩu mới"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>

        {alert && (
          <Alert type={alert.type} onClose={() => setAlert(null)}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        )}

        <div className="w-full border border-solid border-gray-300 my-8"></div>
        <div className="my-6 font-bold text-lg">Chưa có tài khoản?</div>
        <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full hover:bg-indigo-400">
          <a href="/signup" className="text-indigo-600 hover:text-white">ĐĂNG KÝ SOUNDBOX</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

