import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );
      if (response.status === 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col justify-between px-6 py-10">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img
            className="w-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <span className="text-sm font-bold text-white bg-black px-2 py-0.5 rounded-md tracking-wide">CAPTAIN</span>
        </div>

        <h1 className="text-2xl font-bold text-[#111] mb-1">Welcome back</h1>
        <p className="text-[#6B7280] text-sm mb-8">Sign in to your captain account</p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="email@example.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide mt-2 active:scale-95 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-5">
          New captain?{" "}
          <Link to="/captain-signup" className="text-black font-semibold underline">
            Register here
          </Link>
        </p>

        {/* Test credentials */}
        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-yellow-700 mb-1">Test credentials</p>
          <p className="text-xs text-yellow-800">ID: <span className="font-semibold">trial1@gmail.com</span></p>
          <p className="text-xs text-yellow-800">Password: <span className="font-semibold">trial1234</span></p>
        </div>
      </div>

      <Link
        to="/login"
        className="w-full flex items-center justify-center bg-[#00C853] text-white font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
      >
        Sign in as Rider instead
      </Link>
    </div>
  );
};

export default CaptainLogin;
