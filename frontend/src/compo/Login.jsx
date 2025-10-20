import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Authenticate";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) return toast.error("Please fill in all fields!");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ Show success toast with custom styling
      toast.success(`🎉 Welcome back, ${response.data.user.name}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuth(response.data);
      
      // ✅ Delay navigation to show toast
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div className="border border-slate-600 w-full max-w-md rounded-2xl shadow-2xl p-8 bg-slate-800/60 backdrop-blur-md hover:scale-[1.02] transition-all duration-300">
        <div className="text-center py-4 text-3xl font-semibold text-gray-100">
          Chat <span className="text-green-500 font-bold">App</span>
        </div>
        <div className="text-center text-gray-400 mb-6">Welcome back — log in</div>
        <form className="flex flex-col space-y-4 px-2" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-6 text-gray-400 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-green-400 hover:underline ml-1">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
