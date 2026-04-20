import React from "react";

const RidePopUp = ({ ride, confirmRide, setRidePopUpPanel }) => {
  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl">
      {/* Drag handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-pointer"
        onClick={() => setRidePopUpPanel(false)}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="px-5 pb-6">
        {/* Header */}
        <h2 className="text-lg font-bold text-[#111] mb-4">New ride request</h2>

        {/* Rider info */}
        <div className="flex items-center justify-between bg-[#F6F6F6] rounded-2xl px-4 py-3 mb-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold uppercase">
                {(firstName[0] || "") + (lastName[0] || "") || "R"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111]">{firstName} {lastName}</h3>
              <p className="text-xs text-[#6B7280]">Rider</p>
            </div>
          </div>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm text-right">
            <p className="text-xs text-[#6B7280]">Fare</p>
            <p className="text-sm font-bold text-[#111]">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden shadow-sm mb-5">
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-fill" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Pickup</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5 truncate">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-3-line" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Destination</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5 truncate">{ride?.destination}</h3>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setRidePopUpPanel(false)}
            className="flex-1 bg-[#F6F6F6] text-[#6B7280] font-semibold py-4 rounded-2xl text-sm active:scale-95 transition-transform"
          >
            Ignore
          </button>
          <button
            onClick={confirmRide}
            className="flex-1 bg-black text-white font-bold py-4 rounded-2xl text-sm active:scale-95 transition-transform shadow-md"
          >
            Accept Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
