import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: props.ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Ride ended successfully, navigating home.");
        props.setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }

  const firstName = props.ride?.user?.fullname?.firstname || "";
  const lastName = props.ride?.user?.fullname?.lastname || "";

  return (
    <div className="bg-white rounded-t-3xl flex flex-col h-full">
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#111]">Finish Ride</h2>
          <button
            onClick={() => props.setFinishRidePanel(false)}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Rider info card */}
        <div className="flex items-center justify-between bg-[#F6F6F6] rounded-2xl px-4 py-3 mb-5 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Rider"
            />
            <div>
              <h3 className="text-sm font-bold text-[#111]">
                {firstName} {lastName}
              </h3>
              <p className="text-xs text-[#6B7280]">Rider</p>
            </div>
          </div>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm text-center">
            <p className="text-xs text-[#6B7280]">Fare</p>
            <p className="text-sm font-bold text-[#111]">₹{props.ride?.fare}</p>
          </div>
        </div>

        {/* Ride details */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden shadow-sm">
          {/* Pickup */}
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-fill"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] font-medium">Pickup Point</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5">
                {props.ride?.pickup}
              </h3>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <i className="text-white text-sm ri-map-pin-3-line"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] font-medium">Destination</p>
              <h3 className="text-sm font-semibold text-[#111] mt-0.5">
                {props.ride?.destination}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7280] text-center mt-4">
          Tap below only after payment is collected from the rider.
        </p>
      </div>

      {/* Finish button — pinned to bottom */}
      <div className="flex-shrink-0 px-5 pb-6 pt-3">
        <button
          onClick={endRide}
          className="w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform shadow-md"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
