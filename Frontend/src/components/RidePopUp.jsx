import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const RidePopUp = ({ ride, confirmRide, setRidePopUpPanel }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.from(Array.from(contentRef.current.children), {
      opacity: 0, y: 20, stagger: 0.08, duration: 0.4, ease: "power3.out",
    });
  }, [ride]);

  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";
  const initials = (firstName[0] || "") + (lastName[0] || "") || "R";

  return (
    <div className="bg-[#161616] rounded-t-3xl border-t-2 border-[#2A2A2A] shadow-2xl">
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1 cursor-pointer" onClick={() => setRidePopUpPanel(false)}>
        <div className="w-10 h-1 bg-[#3A3A3A] rounded-full" />
      </div>

      <div ref={contentRef} className="px-5 pb-7 pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest mb-0.5">New request</p>
            <h2 className="text-xl font-extrabold text-white">Ride nearby</h2>
          </div>
          <div className="bg-yellow-400/15 border-2 border-yellow-400/40 rounded-2xl px-3 py-1.5">
            <p className="text-sm font-extrabold text-yellow-400">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Rider info */}
        <div className="flex items-center gap-3 bg-[#1E1E1E] border-2 border-[#2E2E2E] rounded-2xl px-4 py-3 mb-4">
          <div className="h-11 w-11 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <span className="text-black text-sm font-extrabold uppercase">{initials}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">{firstName} {lastName}</h3>
            <p className="text-xs text-[#888888]">Rider</p>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-xs text-yellow-400" />
            <span className="text-xs font-bold text-white">4.9</span>
          </div>
        </div>

        {/* Route */}
        <div className="rounded-2xl border-2 border-[#2E2E2E] bg-[#1E1E1E] overflow-hidden mb-5">
          <div className="flex items-start gap-3 p-4 border-b-2 border-[#2E2E2E]">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <i className="text-black text-sm ri-map-pin-fill" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wide">Pickup</p>
              <h3 className="text-sm font-semibold text-white mt-0.5 truncate">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <i className="text-black text-sm ri-map-pin-3-line" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wide">Destination</p>
              <h3 className="text-sm font-semibold text-white mt-0.5 truncate">{ride?.destination}</h3>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setRidePopUpPanel(false)}
            className="flex-1 bg-[#1E1E1E] border-2 border-[#3A3A3A] text-[#AAAAAA] font-semibold py-4 rounded-2xl text-sm active:scale-95 transition-transform"
          >
            Ignore
          </button>
          <button
            onClick={confirmRide}
            className="flex-[2] bg-yellow-400 text-black font-extrabold py-4 rounded-2xl text-sm active:scale-95 transition-transform"
          >
            Accept Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
