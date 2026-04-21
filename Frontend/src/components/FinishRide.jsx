import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const riderCardRef = useRef(null);
  const routeRef = useRef(null);
  const noteRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(headerRef.current, { opacity: 0, y: -16, duration: 0.4 })
      .from(riderCardRef.current, { opacity: 0, y: 20, duration: 0.4 }, "-=0.2")
      .from(routeRef.current, { opacity: 0, y: 16, duration: 0.35 }, "-=0.2")
      .from(noteRef.current, { opacity: 0, duration: 0.3 }, "-=0.1")
      .from(btnRef.current, { opacity: 0, y: 12, scale: 0.97, duration: 0.35 }, "-=0.1");
  }, []);

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.status === 200) {
        setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }

  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";
  const initials = (firstName[0] || "") + (lastName[0] || "") || "R";

  return (
    <div className="h-full bg-[#111111] flex flex-col">
      {/* Header */}
      <div ref={headerRef} className="flex-shrink-0 px-5 pt-6 pb-4 border-b-2 border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest mb-0.5">Trip complete</p>
            <h2 className="text-xl font-extrabold text-white">Finish Ride</h2>
          </div>
          <button
            onClick={() => setFinishRidePanel(false)}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1E1E1E] border-2 border-[#3A3A3A] text-[#AAAAAA]"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
        {/* Rider + fare */}
        <div ref={riderCardRef} className="flex items-center gap-3 bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl px-4 py-3">
          <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <span className="text-black text-base font-extrabold uppercase">{initials}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">{firstName} {lastName}</h3>
            <p className="text-xs text-[#888888]">Rider</p>
          </div>
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl px-3 py-2 text-right">
            <p className="text-[10px] text-[#888888]">Total fare</p>
            <p className="text-base font-extrabold text-yellow-400">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route */}
        <div ref={routeRef} className="rounded-2xl border-2 border-[#2E2E2E] bg-[#1E1E1E] overflow-hidden">
          <div className="flex items-start gap-3 p-4 border-b-2 border-[#2E2E2E]">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-fill" />
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

        <p ref={noteRef} className="text-xs text-[#666666] text-center px-4">
          Only tap "Finish Ride" after you have collected payment from the rider.
        </p>
      </div>

      {/* CTA */}
      <div ref={btnRef} className="flex-shrink-0 px-5 pb-9 pt-3">
        <button
          onClick={endRide}
          className="w-full bg-yellow-400 text-black font-extrabold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
