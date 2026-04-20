import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        {
          fullname: { firstname: firstName, lastname: lastName },
          email,
          password,
          vehicle: {
            colour: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType,
          },
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
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm";

  const labelClass =
    "block text-xs font-semibold text-[#6B7280] mb-1 uppercase tracking-wide";

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

        <h1 className="text-2xl font-bold text-[#111] mb-1">Join as a captain</h1>
        <p className="text-[#6B7280] text-sm mb-8">Create your driver account</p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className={labelClass}>Full Name</label>
            <div className="flex gap-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                placeholder="First name"
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
                placeholder="Last name"
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Create a password"
              className={inputClass}
            />
          </div>

          {/* Vehicle info */}
          <div>
            <label className={labelClass}>Vehicle Details</label>
            <div className="flex gap-3 mb-3">
              <input
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
                type="text"
                placeholder="Color"
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              />
              <input
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
                type="text"
                placeholder="Plate no."
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              />
            </div>
            <div className="flex gap-3">
              <input
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                required
                type="number"
                min="1"
                placeholder="Capacity"
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              />
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
                className={`w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm`}
              >
                <option value="" disabled>Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide mt-2 active:scale-95 transition-transform"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-5">
          Already a captain?{" "}
          <Link to="/captain-login" className="text-black font-semibold underline">
            Login
          </Link>
        </p>
      </div>

      <p className="text-[10px] leading-tight text-[#6B7280] text-center mt-6">
        This site is protected by reCAPTCHA and the{" "}
        <span className="underline">Google Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  );
};

export default CaptainSignup;
