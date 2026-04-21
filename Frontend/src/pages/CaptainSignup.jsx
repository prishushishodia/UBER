import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import gsap from "gsap";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(logoRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power3.out" });
    gsap.from(headingRef.current, { opacity: 0, y: 16, duration: 0.45, delay: 0.2, ease: "power3.out" });
    gsap.from(Array.from(contentRef.current.querySelectorAll(".anim-field")), {
      opacity: 0, y: 18, stagger: 0.08, duration: 0.4, delay: 0.35, ease: "power3.out",
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        {
          fullname: { firstname: firstName, lastname: lastName },
          email,
          password,
          vehicle: { colour: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType },
        }
      );
      if (response.status === 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const inputClass =
    "w-full bg-[#1C1C1C] border-2 border-[#3A3A3A] rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-[#666666] focus:outline-none focus:border-yellow-400 transition";
  const labelClass =
    "block text-xs font-bold text-[#AAAAAA] mb-1.5 uppercase tracking-widest";
  const halfInputClass =
    "w-1/2 bg-[#1C1C1C] border-2 border-[#3A3A3A] rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-[#666666] focus:outline-none focus:border-yellow-400 transition";

  return (
    <div className="min-h-screen bg-[#111111] px-6 py-12 pb-24">
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
          Join as a captain
        </h1>
        <p className="text-[#888888] text-sm">Create your driver account to start earning</p>
      </div>

      <form ref={contentRef} onSubmit={submitHandler} className="flex flex-col gap-5">
        {/* Name */}
        <div className="anim-field">
          <label className={labelClass}>Full Name</label>
          <div className="flex gap-3">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" placeholder="First" className={halfInputClass} />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" placeholder="Last" className={halfInputClass} />
          </div>
        </div>

        {/* Email */}
        <div className="anim-field">
          <label className={labelClass}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="email@example.com" className={inputClass} />
        </div>

        {/* Password */}
        <div className="anim-field">
          <label className={labelClass}>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Create a password" className={inputClass} />
        </div>

        {/* Vehicle divider */}
        <div className="anim-field pt-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#2A2A2A]" />
            <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest">Vehicle Info</span>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>

          <div className="flex gap-3 mb-3">
            <input value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} required type="text" placeholder="Color" className={halfInputClass} />
            <input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} required type="text" placeholder="Plate no." className={halfInputClass} />
          </div>
          <div className="flex gap-3">
            <input value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} required type="number" min="1" placeholder="Capacity" className={halfInputClass} />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="w-1/2 bg-[#1C1C1C] border-2 border-[#3A3A3A] rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
            >
              <option value="" disabled className="bg-[#1C1C1C]">Type</option>
              <option value="car" className="bg-[#1C1C1C]">Car</option>
              <option value="auto" className="bg-[#1C1C1C]">Auto</option>
              <option value="moto" className="bg-[#1C1C1C]">Moto</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="anim-field w-full bg-yellow-400 text-black font-extrabold py-4 rounded-2xl text-sm tracking-wide mt-1 active:scale-95 transition-transform"
        >
          Create Account
        </button>

        <p className="anim-field text-center text-sm text-[#888888]">
          Already a captain?{" "}
          <Link to="/captain-login" className="text-yellow-400 font-bold">
            Login
          </Link>
        </p>
      </form>

      <p className="text-[10px] leading-tight text-[#555555] text-center mt-8">
        Protected by reCAPTCHA · Google Privacy Policy · Terms of Service
      </p>
    </div>
  );
};

export default CaptainSignup;
