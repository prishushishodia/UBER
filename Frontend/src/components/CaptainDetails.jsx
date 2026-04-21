import React, { useContext, useRef, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import gsap from "gsap";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, { opacity: 0, y: 30, duration: 0.55, ease: "power3.out" });
    if (statsRef.current) {
      gsap.from(Array.from(statsRef.current.children), {
        opacity: 0, y: 16, scale: 0.92, stagger: 0.1, duration: 0.45, delay: 0.25, ease: "back.out(1.5)",
      });
    }
  }, []);

  if (!captain?.fullname) {
    return <p className="text-center py-4 text-sm text-[#888888]">Loading...</p>;
  }

  const initials =
    (captain.fullname.firstname?.[0] || "") +
    (captain.fullname.lastname?.[0] || "") || "C";

  return (
    <div ref={cardRef}>
      {/* Captain identity row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Avatar with online pulse */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <span className="text-black text-base font-extrabold uppercase">{initials}</span>
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00C853] border-2 border-[#161616]">
              <span className="absolute inset-0 rounded-full bg-[#00C853] animate-ping opacity-75" />
            </span>
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white capitalize">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <p className="text-xs text-[#888888] mt-0.5">{captain.vehicle?.plate || "—"}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold text-yellow-400">₹300</p>
          <p className="text-xs text-[#888888]">Today</p>
        </div>
      </div>

      {/* Stats row */}
      <div ref={statsRef} className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl p-3.5 text-center">
          <i className="ri-time-line text-lg text-yellow-400" />
          <p className="text-base font-extrabold text-white mt-1">10.2</p>
          <p className="text-[10px] text-[#888888] mt-0.5">Hrs online</p>
        </div>
        <div className="bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl p-3.5 text-center">
          <i className="ri-route-line text-lg text-yellow-400" />
          <p className="text-base font-extrabold text-white mt-1">8</p>
          <p className="text-[10px] text-[#888888] mt-0.5">Rides</p>
        </div>
        <div className="bg-yellow-400 rounded-2xl p-3.5 text-center">
          <i className="ri-star-fill text-lg text-black" />
          <p className="text-base font-extrabold text-black mt-1">4.8</p>
          <p className="text-[10px] text-black/70 mt-0.5">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
