import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
        navigate("/captain-riding",{state:{ride:props.ride}});
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  return (
    <div className="p-6 rounded-t-3xl bg-white shadow-2xl relative max-w-md mx-auto">
      {/* Close Icon */}
      <button
        onClick={() => props.setConfirmRidePopUpPanel(false)}
        className="absolute top-4 -translate-y-14 left-1/2 text-2xl text-gray-500 hover:text-black transition"
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
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0"
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
              {props.ride?.pickup}
            </div>
            <p className="text-sm text-gray-500">Pickup Point</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-blue-600 ri-map-pin-3-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {props.ride?.destination}
            </div>
            <p className="text-sm text-gray-500">Destination</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              ₹{props.ride?.fare}
            </div>
            <p className="text-sm text-gray-500">Fare</p>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <div className="mt-6 flex flex-col gap-3">
        <form onSubmit={submitHandler} className="flex flex-col gap-3 w-full px-6 py-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-[#eee] px-4 py-2 text-center text-base rounded-lg w-full"
            type="text"
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-center text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition w-full"
          >
            Confirm Ride
          </button>

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
