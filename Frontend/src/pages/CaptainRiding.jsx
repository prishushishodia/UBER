import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LiveTracking from "../components/LiveTracking";
import Logo from "../components/Logo";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const bottomBarRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  const riderFirstName = rideData?.user?.fullname?.firstname || "";
  const riderLastName = rideData?.user?.fullname?.lastname || "";
  const riderInitials = (riderFirstName[0] || "") + (riderLastName[0] || "") || "R";

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
    <div className="relative h-screen w-screen overflow-hidden bg-night">
      {/* Top bar */}
      <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-4 pt-4">
        <div className="animate-fade-in rounded-2xl border border-white/10 bg-night/80 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <Logo variant="dark" size="sm" badge="Captain" />
        </div>
        <Link to="/captain-home" aria-label="Back to home" className="map-action-dark animate-fade-in">
          <i className="ri-home-5-line" />
        </Link>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking variant="dark" />
      </div>

      {/* Bottom trip bar */}
      <div ref={bottomBarRef} className="absolute right-0 bottom-0 left-0 z-30">
        <div className="sheet-dark px-5 pt-4 pb-7">
          {/* Drag pill */}
          <div className="mb-4">
            <div className="grab-dark" />
          </div>

          {/* Status chip */}
          <div className="mb-4 flex justify-center">
            <span className="chip border border-go/20 bg-go/10 text-go">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-go" />
              Trip in progress
            </span>
          </div>

          {/* Destination card */}
          <div className="tile-dark mb-4 px-4 py-4">
            <p className="mb-1 text-[10px] font-bold tracking-[0.18em] text-night-fog uppercase">
              <i className="ri-navigation-fill mr-1 text-gold" />
              Heading to
            </p>
            <h3 className="truncate text-base font-extrabold text-white">
              {rideData?.destination || "—"}
            </h3>
            <div className="mt-3 flex items-center gap-2.5 border-t border-night-line pt-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold">
                <span className="text-[10px] font-extrabold text-night uppercase">{riderInitials}</span>
              </div>
              <p className="text-xs text-night-fog">
                <span className="font-bold text-white capitalize">{riderFirstName || "Rider"}</span>
                {" · "}₹{rideData?.fare} cash on arrival
              </p>
            </div>
          </div>

          {/* Complete trip */}
          <button onClick={() => setFinishRidePanel(true)} className="btn-gold">
            <i className="ri-flag-2-line text-base" />
            Complete trip
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
