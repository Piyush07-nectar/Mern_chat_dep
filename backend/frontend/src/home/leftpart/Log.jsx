import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authenticate"; // ✅ update context after logout

const Log = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {},
        { withCredentials: true } // ✅ include cookie
      );

      toast.success("Logged out successfully!");

      // ✅ Clear auth state and storage
      setAuth(null);
      localStorage.removeItem("ChatApp");

      // ✅ Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div
      className="text-[25px] mx-7 mt-2 hover:bg-gray-500 rounded-full w-[30px] cursor-pointer flex items-center justify-center"
      onClick={handleLogout} // ✅ simpler than form submit
    >
      <RiLogoutCircleLine />
    </div>
  );
};

export default Log;
