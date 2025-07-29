import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div className="relative px-4 pt-2 pb-6 bg-white rounded-t-2xl shadow-md">
      {/* Top handle arrow */}
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="absolute top-0 left-0 w-full flex justify-center items-center -translate-y-6 py-0 cursor-pointer text-gray-700"
      >
        <i className="ri-arrow-down-wide-line text-2xl"></i>
      </h5>
      <div className="flex justify-between items-center">
        <img
          className="h-25 object-contain"
          src="https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n"
          alt="car waiting"
        />
        <div>
       <h2>{props.ride?.captain?.fullname?.firstname}</h2>
<h4>{props.ride?.captain?.vehicle?.plate}</h4>
          <p>Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold">OTP:{props.ride?.otp}</h1>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex flex-col items-center mt-6">
        {/* Car Image */}

        {/* Ride Details */}
        <div className="w-full mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm">
          {/* Pickup */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-blue-600 ri-map-pin-fill"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {props.ride?.pickup}
              </h3>
              <p className="text-sm text-gray-500">pickup</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-green-600 ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {props.ride?.destination}
              </h3>
              <p className="text-sm text-gray-500">destination</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                ₹{props.ride?.fare}
              </h3>
              <p className="text-sm text-gray-500">Ride Fare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
