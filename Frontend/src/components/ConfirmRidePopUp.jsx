import React, { useState } from "react";
import { Link } from "react-router-dom";


const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState()

  const submitHandler=(e)=>{
e.preventDefault( )
  }


  return (
    <div className="p-6 rounded-t-3xl bg-white  shadow-2xl relative max-w-md mx-auto">
      {/* Close Icon */}
      <button
        onClick={() => props.setConfirmRidePopUpPanel(false)}
        className="absolute top-4 -translate-y-14  left-1/2 text-2xl text-gray-500 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold text-center text-gray-800 mt-2 mb-6">
        🚘 Confirm Your Ride
      </h2>

      {/* Rider Info */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl mb-4 shadow-inner">
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full object-cover border border-gray-300"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Rider"
          />
          <div className="text-gray-700 font-medium text-base">Riya Singh</div>
        </div>
        <div className="text-sm font-semibold text-gray-600">2.2 km</div>
      </div>

      {/* Ride Details */}
      <div className="divide-y divide-gray-200">
        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-green-600 ri-map-pin-fill"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Pickup Point
            </div>
            <p className="text-sm text-gray-500">
              562/11-B, Kankariya Talab, Bhopal
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-blue-600 ri-map-pin-3-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Destination
            </div>
            <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">Fare</div>
            <p className="text-sm text-gray-500">₹99</p>
          </div>
        </div>
      </div>


      <div className="mt-6 flex flex-col gap-3">
   <form
  onSubmit={(e) => {
    submitHandler(e);
  }}
  className="flex flex-col gap-3 w-full px-6 py-4"
>
  <input
  value={otp }
  onChange={(e)=>{
    setOtp(e.target.value)
  }}
    className="bg-[#eee] px-4 py-2  text-center text-base rounded-lg w-full"
    type="text"
    placeholder="Enter OTP"
  />

  <Link
    to="/captain-riding"
    className="bg-green-500 hover:bg-green-600 text-center text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition w-full"
  >
    Confirm Ride
  </Link>

  <button
    type="button"
    onClick={() => {
      props.setRidePopUpPanel(false);
      props.setConfirmRidePopUpPanel(false);
    }}
    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition w-full"
  >
    Reject
  </button>
</form>

      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
