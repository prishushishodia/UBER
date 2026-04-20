import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ride-ended", () => navigate("/home"));
    return () => socket.off("ride-ended");
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#F6F6F6]">
      {/* Home button */}
      <Link
        to="/home"
        className="fixed right-4 top-4 z-50 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
      >
        <i className="text-lg text-[#111] ri-home-5-line"></i>
      </Link>

      {/* Map — top 55% */}
      <div className="h-[55%] w-full">
        <LiveTracking />
      </div>

      {/* Bottom panel — 45% */}
      <div className="h-[45%] bg-white rounded-t-3xl shadow-2xl px-5 pt-5 pb-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <h2 className="text-lg font-bold text-[#111] mb-4">Ride Summary</h2>

          {/* Ride details card */}
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#F6F6F6] overflow-hidden shadow-sm">
            {/* Pickup */}
            <div className="flex items-start gap-3 p-4">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <i className="text-white text-sm ri-map-pin-fill"></i>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-medium">Pickup Point</p>
                <h3 className="text-sm font-semibold text-[#111] mt-0.5">
                  {ride?.pickup}
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
                  {ride?.destination}
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
                  ₹{ride?.fare}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Payment button */}
        <button className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mt-4">
          Payment Done
        </button>
      </div>
    </div>
  );
};

export default Riding;
