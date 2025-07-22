import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="absolute top-0 left-0 w-full bg-transparent text-2xl font-bold flex justify-center items-center py-2"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="font-semibold">CHOOSE A VEHICLE</h3>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true),
          props.selectVehicle("car"); 
        }}
        className="flex my-2 items-center border-transparent bg-gray-200 active:border-black border-2 rounded-xl p-3 justify-between "
      >
        <img
          className="h-20"
          src="https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm ">
            UBERgo <i className="ri-user-fill"></i>
          </h4>
          <h5 className="font-medium text-sm">2 mins away!</h5>
          <p className="font-medium text-sm">affordable compact ride</p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare?.car}</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("auto"); 
        }}
        className="flex border-transparent active:border-black border-2 rounded-xl bg-gray-200 p-3 justify-between "
      >
        <img
          className="h-20"
          src="https://imgs.search.brave.com/melL_E1WXhsfg8Yd_bvuYDVAtWcWDi9anJMBm_SOAfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjYv/MTE0Lzk0MS9zbWFs/bC9jbmctYXV0by1j/YXItc2lsaG91ZXR0/ZS1saW5lLWFydC1p/bGx1c3RyYXRpb24t/b2YtZWNvLWZyaWVu/ZGx5LXJpY2tzaGF3/LWZyZWUtcG5nLnBu/Zw"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm ">
            UBERgo <i className="ri-user-fill"></i>
          </h4>
          <h5 className="font-medium text-sm">2 mins away!</h5>
          <p className="font-medium text-sm">affordable compact ride</p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare?.auto}</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("moto"); 
        }}
        className="flex mt-2 border-transparent active:border-black border-2 bg-gray-200 rounded-xl p-3 justify-between"
      >
        <img
          className="h-16  scale-x-[-1]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />

        <div className="w-1/2">
          <h4 className="font-medium text-sm ">
            UBERgo <i className="ri-user-fill"></i>
          </h4>
          <h5 className="font-medium text-sm">2 mins away!</h5>
          <p className="font-medium text-sm">affordable compact ride</p>
        </div>
        <h2 className="text-2xl font-semibold">₹{props.fare?.moto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
