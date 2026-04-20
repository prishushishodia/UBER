import React from "react";

const images = {
  car: "https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n",
  auto: "https://imgs.search.brave.com/melL_E1WXhsfg8Yd_bvuYDVAtWcWDi9anJMBm_SOAfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjYv/MTE0Lzk0MS9zbWFs/bC9jbmctYXV0by1j/YXItc2lsaG91ZXR0/ZS1saW5lLWFydC1p/bGx1c3RyYXRpb24t/b2YtZWNvLWZyaWVu/ZGx5LXJpY2tzaGF3/LWZyZWUtcG5nLnBu/Zw",
  moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
};

const ConfirmRide = ({
  vehicleType,
  pickup,
  destination,
  fare,
  setConfirmRidePanel,
  setVehiclePanel,
  setVehicleFound,
  createRide,
}) => {
  const imgSrc = images[vehicleType] || images.car;
  const isMoto = vehicleType === "moto";

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl">
      {/* Drag handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-pointer"
        onClick={() => setConfirmRidePanel(false)}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="px-5 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#111]">Confirm ride</h2>
          <button
            onClick={() => setConfirmRidePanel(false)}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Vehicle + price row */}
        <div className="flex items-center justify-between bg-[#F6F6F6] rounded-2xl px-4 py-3 mb-4">
          <img
            src={imgSrc}
            alt={vehicleType}
            className={`h-14 object-contain ${isMoto ? "scale-x-[-1]" : ""}`}
          />
          <div className="text-right">
            <p className="text-xs text-[#6B7280] font-medium">Estimated fare</p>
            <p className="text-2xl font-extrabold text-[#111]">
              ₹{fare?.[vehicleType] ?? "—"}
            </p>
          </div>
        </div>

        {/* Route info */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden mb-5">
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-fill" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Pickup</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5 truncate">{pickup}</h3>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-3-line" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium">Destination</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5 truncate">{destination}</h3>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={() => {
            setVehicleFound(true);
            setConfirmRidePanel(false);
            setVehiclePanel(false);
            createRide();
          }}
          className="w-full bg-black text-white font-bold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform shadow-md"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
