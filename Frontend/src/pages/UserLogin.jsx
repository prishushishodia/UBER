import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setemail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col justify-between px-6 py-10">
      {/* Top: logo + form */}
      <div>
        {/* Logo */}
        <img
          className="w-12 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />

        <h1 className="text-2xl font-bold text-[#111] mb-1">Welcome back</h1>
        <p className="text-[#6B7280] text-sm mb-8">Sign in to your account</p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
              placeholder="email@example.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
            />
          </div>

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide mt-2 active:scale-95 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-5">
          New here?{" "}
          <Link to="/signup" className="text-black font-semibold underline">
            Create an account
          </Link>
        </p>

        {/* Test credentials */}
        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-yellow-700 mb-1">Test credentials</p>
          <p className="text-xs text-yellow-800">ID: <span className="font-semibold">trial@gmail.com</span></p>
          <p className="text-xs text-yellow-800">Password: <span className="font-semibold">trial1234</span></p>
        </div>
      </div>

      {/* Bottom: Captain login */}
      <div>
        <Link
          to="/captain-login"
          className="w-full flex items-center justify-center gap-2 bg-[#00C853] text-white font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
        >
          <i className="ri-steering-2-line text-base"></i>
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
