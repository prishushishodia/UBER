import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("User created:", data);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }

      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        alert(
          error.response.data?.message || JSON.stringify(error.response.data)
        );
      } else {
        alert("Something went wrong.");
      }
    }
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

        <h1 className="text-2xl font-bold text-[#111] mb-1">Create account</h1>
        <p className="text-[#6B7280] text-sm mb-8">
          Sign up to get started with Uber
        </p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Name row */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide">
              Full Name
            </label>
            <div className="flex gap-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                placeholder="First name"
                className="w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
                placeholder="Last name"
                className="w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
              />
            </div>
          </div>

          {/* Email */}
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
              placeholder="Create a password"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide mt-2 active:scale-95 transition-transform"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold underline">
            Login
          </Link>
        </p>
      </div>

      {/* Bottom: disclaimer */}
      <div>
        <p className="text-[10px] leading-tight text-[#6B7280] text-center">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
