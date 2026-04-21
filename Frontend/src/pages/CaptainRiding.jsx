import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const bottomBarRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  useEffect(() => {
    gsap.set(finishRidePanelRef.current, { y: "100%" });
    // Slide up bottom bar on mount
    gsap.from(bottomBarRef.current, { y: 80, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.2 });
  }, []);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? "0%" : "100%",
      duration: 0.45,
      ease: "power3.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#0A0A0A]">
      {/* Logo */}
      <img
        className="w-14 brightness-0 invert absolute left-4 top-4 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      {/* Back button */}
      <Link
        to="/captain-home"
        className="absolute right-4 top-4 z-20 h-10 w-10 bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line text-white text-base" />
      </Link>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Bottom ride bar */}
      <div ref={bottomBarRef} className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-black rounded-t-3xl border-t border-white/10 shadow-2xl px-5 pt-4 pb-7">
          {/* Drag pill */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Status chip */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/20 rounded-full px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C853] animate-pulse" />
              <span className="text-xs font-bold text-[#00C853] tracking-wide">Ride in progress</span>
            </div>
          </div>

          {/* Destination info */}
          <div className="bg-white/5 border border-white/15 rounded-2xl px-4 py-4 mb-4">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Heading to</p>
            <h3 className="text-base font-extrabold text-white truncate">
              {rideData?.destination || "—"}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-5 w-5 rounded-full bg-[#FFD60A] flex items-center justify-center">
                <span className="text-black text-[9px] font-extrabold uppercase">
                  {(rideData?.user?.fullname?.firstname?.[0] || "") + (rideData?.user?.fullname?.lastname?.[0] || "")}
                </span>
              </div>
              <p className="text-xs text-white/60">
                {rideData?.user?.fullname?.firstname || "Rider"} · ₹{rideData?.fare}
              </p>
            </div>
          </div>

          {/* Complete button */}
          <button
            onClick={() => setFinishRidePanel(true)}
            className="w-full bg-[#FFD60A] text-black font-extrabold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform shadow-lg shadow-[#FFD60A]/20"
          >
            Complete Ride
          </button>
        </div>
      </div>

      {/* Finish ride panel */}
      <div ref={finishRidePanelRef} className="fixed inset-0 z-50">
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
