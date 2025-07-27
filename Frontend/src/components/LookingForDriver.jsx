import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="relative px-5 pt-4 pb-8 bg-white rounded-t-3xl shadow-lg">
      {/* Top handle arrow */}
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="absolute top-2 left-0 w-full flex justify-center items-center cursor-pointer text-gray-500"
      >
        <i className="ri-arrow-down-wide-line text-2xl"></i>
      </h5>

      {/* Title */}
      <h3 className="font-semibold mt-10 text-center text-gray-900 text-xl tracking-wide">
        Looking for a driver
        <span className="inline-block animate-pulse">...</span>
      </h3>

      {/* Content Block */}
      <div className="flex flex-col items-center mt-6">
        {/* Car Image */}
        <img
          className="h-40 object-contain"
          src="https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n"
          alt="car waiting"
        />

        {/* Ride Details */}
        <div className="w-full mt-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-200">
          {/* Pickup */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-blue-600 ri-map-pin-fill"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{props.ride?.pickup}</h3>
              <p className="text-sm text-gray-500">pickup</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-green-600 ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{props.ride?.destination}</h3>
              <p className="text-sm text-gray-500">destination</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-900">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-500">Ride Fare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
