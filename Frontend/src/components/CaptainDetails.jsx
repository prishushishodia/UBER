import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain?.fullname) {
    return <p className="text-center py-4 text-sm text-[#6B7280]">Loading...</p>;
  }

  const initials =
    (captain.fullname.firstname?.[0] || "") +
    (captain.fullname.lastname?.[0] || "") || "C";

  return (
    <div>
      {/* Captain name + earnings */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <span className="text-white text-base font-bold uppercase">{initials}</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111] capitalize">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <p className="text-xs text-[#6B7280]">{captain.vehicle?.plate || "—"}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold text-[#111]">₹300</p>
          <p className="text-xs text-[#6B7280]">Earned today</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex-1 bg-[#F6F6F6] rounded-2xl p-3 text-center">
          <i className="ri-time-line text-xl text-[#111]" />
          <p className="text-base font-bold text-[#111] mt-1">10.2</p>
          <p className="text-xs text-[#6B7280]">Hrs online</p>
        </div>
        <div className="flex-1 bg-[#F6F6F6] rounded-2xl p-3 text-center">
          <i className="ri-speed-up-line text-xl text-[#111]" />
          <p className="text-base font-bold text-[#111] mt-1">8</p>
          <p className="text-xs text-[#6B7280]">Rides</p>
        </div>
        <div className="flex-1 bg-yellow-400 rounded-2xl p-3 text-center">
          <i className="ri-star-fill text-xl text-black" />
          <p className="text-base font-bold text-black mt-1">4.8</p>
          <p className="text-xs text-black/70">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
