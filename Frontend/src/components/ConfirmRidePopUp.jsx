import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: { rideId: ride._id, otp },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setConfirmRidePopUpPanel(false);
        setRidePopUpPanel(false);
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#111]">Ride confirmed</h2>
          <button
            onClick={() => setConfirmRidePopUpPanel(false)}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>
        <p className="text-xs text-[#6B7280] mt-1">Ask the rider for the OTP to start the ride</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Rider info */}
        <div className="flex items-center justify-between bg-[#F6F6F6] rounded-2xl px-4 py-3 mb-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span className="text-white text-base font-bold uppercase">
                {(firstName[0] || "") + (lastName[0] || "") || "R"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111]">{firstName} {lastName}</h3>
              <p className="text-xs text-[#6B7280]">Rider</p>
            </div>
          </div>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm text-right">
            <p className="text-xs text-[#6B7280]">Fare</p>
            <p className="text-sm font-bold text-[#111]">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden shadow-sm mb-5">
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-fill" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Pickup</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-3-line" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Destination</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5">{ride?.destination}</h3>
            </div>
          </div>
        </div>

        {/* OTP input */}
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
            Enter OTP from rider
          </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="_ _ _ _ _ _"
            required
            className="bg-[#F6F6F6] border border-gray-200 rounded-2xl px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#111] focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </form>
      </div>

      {/* Bottom actions */}
      <div className="flex-shrink-0 px-5 pb-8 pt-3 flex flex-col gap-3">
        <button
          onClick={submitHandler}
          className="w-full bg-[#00C853] text-white font-bold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform shadow-md"
        >
          Start Ride
        </button>
        <button
          onClick={() => {
            setRidePopUpPanel(false);
            setConfirmRidePopUpPanel(false);
          }}
          className="w-full bg-[#F6F6F6] text-[#6B7280] font-semibold py-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
