import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(logoRef.current, { opacity: 0, y: -24, duration: 0.55 })
      .from(headingRef.current.children, { opacity: 0, y: 18, stagger: 0.1, duration: 0.45 }, "-=0.2")
      .from(Array.from(formRef.current.children), { opacity: 0, y: 22, stagger: 0.1, duration: 0.4 }, "-=0.15")
      .from(bottomRef.current, { opacity: 0, y: 16, duration: 0.4 }, "-=0.1");
  }, []);

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

  const inputClass =
    "w-full bg-[#1C1C1C] border-2 border-[#3A3A3A] rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-[#666666] focus:outline-none focus:border-yellow-400 transition";

  const labelClass =
    "block text-xs font-bold text-[#AAAAAA] mb-1.5 uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col justify-between px-6 py-12">
      <div>
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2.5 mb-10">
          <img
            className="w-10 brightness-0 invert"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <span className="text-xs font-extrabold text-black bg-yellow-400 px-2.5 py-1 rounded-lg tracking-widest uppercase">
            Captain
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-9">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-[#888888] text-sm">Sign in to start earning</p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={submitHandler} className="flex flex-col gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="email@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-extrabold py-4 rounded-2xl text-sm tracking-wide mt-1 active:scale-95 transition-transform"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-[#888888]">
            New captain?{" "}
            <Link to="/captain-signup" className="text-yellow-400 font-bold">
              Register here
            </Link>
          </p>

          {/* Test credentials */}
          <div className="bg-[#1C1C1C] border-2 border-yellow-400/30 rounded-2xl px-4 py-3">
            <p className="text-xs font-extrabold text-yellow-400 mb-2">Test credentials</p>
            <p className="text-sm text-[#CCCCCC]">
              ID: <span className="font-bold text-white">trial1@gmail.com</span>
            </p>
            <p className="text-sm text-[#CCCCCC]">
              Password: <span className="font-bold text-white">trial1234</span>
            </p>
          </div>
        </form>
      </div>

      {/* Switch to rider */}
      <div ref={bottomRef} className="mt-8">
        <Link
          to="/login"
          className="w-full flex items-center justify-center gap-2 bg-[#1C1C1C] border-2 border-[#3A3A3A] text-[#CCCCCC] font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
        >
          <i className="ri-user-line text-base" />
          Switch to Rider login
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
