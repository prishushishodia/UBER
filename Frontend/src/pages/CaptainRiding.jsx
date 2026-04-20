import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  useEffect(() => {
    gsap.set(finishRidePanelRef.current, { y: "100%" });
  }, []);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#F6F6F6]">
      {/* Logo */}
      <img
        className="w-14 absolute left-4 top-4 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      {/* Back */}
      <Link
        to="/captain-home"
        className="absolute right-4 top-4 z-20 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
      >
        <i className="ri-home-5-line text-[#111]" />
      </Link>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Bottom ride bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-yellow-400 rounded-t-3xl shadow-2xl px-5 pt-4 pb-6">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-1 bg-yellow-600/30 rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-4">
              <p className="text-xs font-semibold text-black/60 mb-0.5">Heading to</p>
              <h3 className="text-base font-bold text-black truncate">
                {rideData?.destination || "—"}
              </h3>
              <p className="text-xs text-black/60 mt-0.5">
                Rider: {rideData?.user?.fullname?.firstname || "—"}
              </p>
            </div>
            <button
              onClick={() => setFinishRidePanel(true)}
              className="flex-shrink-0 bg-black text-white font-bold py-3 px-5 rounded-2xl text-sm active:scale-95 transition-transform shadow-md"
            >
              Complete
            </button>
          </div>
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
