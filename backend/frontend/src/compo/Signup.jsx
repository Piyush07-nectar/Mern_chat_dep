import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../context/Authenticate";
import { Link ,Navigate, useNavigate} from "react-router-dom";
const Signup = () => {
  const Navigate=useNavigate();
  const [authen,setAuthen]=useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    // --- Validation ---
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  const user_data={
    name: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
  };
 try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, user_data, {
          withCredentials: true, // ✅ allow cookies
        }
);

    // ✅ If signup is successful
    toast.success(`🎉 Welcome ${form.username}! Account created successfully!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    localStorage.setItem("ChatApp", JSON.stringify(response.data));
    setAuthen(response.data);
    
    // ✅ Delay navigation to show toast
    setTimeout(() => {
      Navigate("/");
    }, 1000);

  } catch (error) {
    // ❌ If signup fails
    console.error("Signup Error:", error);

    // ✅ If backend sends an error message
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`❌ ${error.response.data.error}`, {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      toast.error("❌ Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div className="border border-slate-600 w-full max-w-md rounded-2xl shadow-2xl p-8 bg-slate-800/60 backdrop-blur-md hover:scale-[1.02] transition-all duration-300">
        {/* Header */}
        <div className="text-center py-4 text-3xl font-semibold text-gray-100">
          Chat <span className="text-green-500 font-bold">App</span>
        </div>
        <div className="text-center text-gray-400 mb-6">Create your account</div>

        {/* Form */}
        <form className="flex flex-col space-y-4 px-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            required
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center mt-6 text-gray-400 text-sm">
          Have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline ml-1">
            Login
          </Link>
        </div>
      </div>

      {/* ✅ Toast Container */}
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

export default Signup;
