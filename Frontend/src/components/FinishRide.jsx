import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props.ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setFinishRidePanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }

  return (
    <div className="p-6 rounded-t-3xl bg-white  shadow-2xl relative max-w-md mx-auto">
      {/* Close Icon */}
      <button
        onClick={() => props.setFinishRidePanel(false)}
        className="absolute top-4 -translate-y-14  left-1/2 text-2xl text-gray-500 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold text-center text-gray-800 mt-2 mb-6">
        Finish this ride?
      </h2>

      {/* Rider Info */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl mb-4 shadow-inner">
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full object-cover border border-gray-300"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Rider"
          />
          <div className="text-gray-700 font-medium text-base">
            {props.ride?.user?.fullname?.firstname}{" "}
            {props.ride?.user?.fullname?.lastname}
          </div>
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
            <p className="text-sm text-gray-500">{props.ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-blue-600 ri-map-pin-3-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Destination
            </div>
            <p className="text-sm text-gray-500">{props.ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-4">
          <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
          <div>
            <div className="text-sm font-semibold text-gray-800">Fare</div>
            <p className="text-sm text-gray-500">₹{props.ride?.fare}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={endRide}
          to="/captain-home"
          className="bg-yellow-500 hover:bg-green-600 text-center text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition w-full"
        >
          Finish Ride
        </button>
        <p className="text-red-500 text-center text-sm">
          Click on the finish ride button if you have completed the payment.
        </p>
      </div>
    </div>
  );
};

export default FinishRide;
