import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="bg-white rounded-t-3xl px-5 pt-3 pb-6">
      {/* Drag handle */}
      <div
        className="flex justify-center pb-3 cursor-pointer"
        onClick={() => props.setVehicleFound(false)}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Header */}
      <h2 className="text-lg font-bold text-[#111] mb-1">Finding your driver</h2>
      <p className="text-xs text-[#6B7280] mb-5">
        Please wait while we match you with a nearby captain
      </p>

      {/* Animated icon */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative flex items-center justify-center">
          {/* Pulse rings */}
          <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#00C853]/20 animate-ping" />
          <span className="absolute inline-flex h-14 w-14 rounded-full bg-[#00C853]/30 animate-ping [animation-delay:0.3s]" />
          {/* Icon circle */}
          <div className="relative z-10 h-16 w-16 rounded-full bg-black flex items-center justify-center shadow-lg">
            <i className="ri-taxi-wifi-line text-2xl text-white"></i>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-4 animate-pulse">
          Searching for captains nearby…
        </p>
      </div>

      {/* Ride details */}
      <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden shadow-sm">
        {/* Pickup */}
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <i className="text-white text-sm ri-map-pin-fill"></i>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] font-medium">Pickup</p>
            <h3 className="text-sm font-semibold text-[#111] mt-0.5">
              {props.ride?.pickup}
            </h3>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
            <i className="text-white text-sm ri-map-pin-3-line"></i>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] font-medium">Destination</p>
            <h3 className="text-sm font-semibold text-[#111] mt-0.5">
              {props.ride?.destination}
            </h3>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <i className="text-white text-sm ri-money-rupee-circle-line"></i>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] font-medium">Estimated Fare</p>
            <h3 className="text-sm font-semibold text-[#111] mt-0.5">
              ₹{props.ride?.fare}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
