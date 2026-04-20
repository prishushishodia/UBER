import React from "react";

const WaitingForDriver = (props) => {
  const captainFirstName = props.ride?.captain?.fullname?.firstname || "";
  const captainLastName = props.ride?.captain?.fullname?.lastname || "";
  const initials =
    (captainFirstName[0] || "") + (captainLastName[0] || "") || "C";

  return (
    <div className="bg-white rounded-t-3xl px-5 pt-3 pb-6">
      {/* Drag handle */}
      <div
        className="flex justify-center pb-3 cursor-pointer"
        onClick={() => props.setWaitingForDriver(false)}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Header */}
      <h2 className="text-lg font-bold text-[#00C853] mb-1">
        Your ride is confirmed!
      </h2>
      <p className="text-xs text-[#6B7280] mb-4">
        Your captain is on the way to pick you up
      </p>

      {/* Captain info + OTP */}
      <div className="flex items-center justify-between bg-[#F6F6F6] rounded-2xl px-4 py-3 mb-5 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <span className="text-white text-base font-bold uppercase">
              {initials}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111]">
              {captainFirstName} {captainLastName}
            </h3>
            <p className="text-xs text-[#6B7280]">
              {props.ride?.captain?.vehicle?.plate || "—"}
            </p>
          </div>
        </div>

        {/* OTP box */}
        <div className="bg-black rounded-xl px-4 py-2 text-center">
          <p className="text-[10px] text-gray-400 font-medium">OTP</p>
          <p className="text-lg font-extrabold text-white tracking-widest leading-none">
            {props.ride?.otp}
          </p>
        </div>
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
            <p className="text-xs text-[#6B7280] font-medium">Ride Fare</p>
            <h3 className="text-sm font-semibold text-[#111] mt-0.5">
              ₹{props.ride?.fare}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
