import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const riderCardRef = useRef(null);
  const routeRef = useRef(null);
  const otpRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(headerRef.current, { opacity: 0, y: -16, duration: 0.4 })
      .from(riderCardRef.current, { opacity: 0, y: 20, duration: 0.4 }, "-=0.2")
      .from(routeRef.current, { opacity: 0, y: 16, duration: 0.35 }, "-=0.2")
      .from(otpRef.current, { opacity: 0, scale: 0.95, duration: 0.4 }, "-=0.15")
      .from(Array.from(actionsRef.current.children), { opacity: 0, y: 12, stagger: 0.08, duration: 0.35 }, "-=0.2");
  }, []);

  const submitHandler = async (e) => {
    e?.preventDefault();
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
  const initials = (firstName[0] || "") + (lastName[0] || "") || "R";

  return (
    <div className="h-full bg-[#111111] flex flex-col">
      {/* Header */}
      <div ref={headerRef} className="flex-shrink-0 px-5 pt-6 pb-4 border-b-2 border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest mb-0.5">Confirmed</p>
            <h2 className="text-xl font-extrabold text-white">Start the ride</h2>
          </div>
          <button
            onClick={() => setConfirmRidePopUpPanel(false)}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1E1E1E] border-2 border-[#3A3A3A] text-[#AAAAAA]"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
        <p className="text-sm text-[#888888] mt-1.5">Ask the rider for the OTP to begin</p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
        {/* Rider card */}
        <div ref={riderCardRef} className="flex items-center gap-3 bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl px-4 py-3">
          <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <span className="text-black text-base font-extrabold uppercase">{initials}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">{firstName} {lastName}</h3>
            <p className="text-xs text-[#888888]">Rider</p>
          </div>
          <div className="text-right bg-[#111111] rounded-xl px-3 py-1.5 border border-[#2A2A2A]">
            <p className="text-[10px] text-[#888888]">Fare</p>
            <p className="text-sm font-extrabold text-yellow-400">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route */}
        <div ref={routeRef} className="rounded-2xl border-2 border-[#2E2E2E] bg-[#1E1E1E] overflow-hidden">
          <div className="flex items-start gap-3 p-4 border-b-2 border-[#2E2E2E]">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <i className="text-black text-sm ri-map-pin-fill" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wide">Pickup</p>
              <h3 className="text-sm font-semibold text-white mt-0.5">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <i className="text-black text-sm ri-map-pin-3-line" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wide">Destination</p>
              <h3 className="text-sm font-semibold text-white mt-0.5">{ride?.destination}</h3>
            </div>
          </div>
        </div>

        {/* OTP input */}
        <div ref={otpRef} className="bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl p-5">
          <p className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest mb-3">Enter OTP from rider</p>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="- - - - - -"
            required
            className="w-full bg-[#111111] border-2 border-[#3A3A3A] rounded-xl px-4 py-4 text-center text-2xl font-extrabold tracking-[0.5em] text-yellow-400 focus:outline-none focus:border-yellow-400 transition placeholder:text-[#444444] placeholder:tracking-widest"
          />
        </div>
      </div>

      {/* Actions */}
      <div ref={actionsRef} className="flex-shrink-0 px-5 pb-9 pt-3 flex flex-col gap-3">
        <button
          onClick={submitHandler}
          className="w-full bg-yellow-400 text-black font-extrabold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
        >
          Start Ride
        </button>
        <button
          onClick={() => { setRidePopUpPanel(false); setConfirmRidePopUpPanel(false); }}
          className="w-full bg-[#1E1E1E] border-2 border-[#3A3A3A] text-[#AAAAAA] font-semibold py-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
