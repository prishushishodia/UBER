import React from "react";

const RidePopUp = (props) => {
  return (
    <div className="p-4 rounded-2xl bg-white  relative">
      {/* Close Icon */}
      <button
        onClick={() => props.setRidePopUpPanel(false)}
        className="absolute top-2 left-1/2 text-2xl text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Header */}
      <h3 className="text-lg text-center font-bold text-gray-800 mb-4 mt-6">
        🚘 wanna pick this New Ride Request?
      </h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-3">
        <div className="flex items-center gap-3 text-base font-medium text-gray-700">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Rider"
          />
          <span>{props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname} </span>
        </div>
        <span className="text-sm font-semibold text-gray-600">2.2 km</span>
      </div>

      {/* Ride Details */}
      <div className="divide-y">
        <div className="flex items-start gap-4 py-3">
          <i className="text-xl text-green-600 ri-map-pin-fill"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">
              Pickup Point
            </h4>
            <p className="text-sm text-gray-500">
              {props.ride?.pickup}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-3">
          <i className="text-xl text-blue-600 ri-map-pin-3-line"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">
              Destination
            </h4>
            <p className="text-sm text-gray-500">{props.ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 py-3">
          <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">Fare</h4>
            <p className="text-sm text-gray-500">₹{props.ride?.fare}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className=" bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Accept Ride
        </button>
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className=" bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-lg transition"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
