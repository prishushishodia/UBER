import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="absolute top-0 left-0 w-full bg-transparent text-2xl font-bold flex justify-center items-center py-2"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold">CONFIRM YOUR RIDE</h3>
      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-40"
          src="https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-500">kankariya Talab, bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t-1">
            <i className="ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-500">kankariya Talab, bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t-1">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">99</h3>
              <p className="text-sm -mt-1 text-gray-500">kankariya Talab, bhopal</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false )
        }} className="w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-lg">
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
