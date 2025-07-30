import React from "react";

const ConfirmRide = (props) => {
  // Define image sources based on vehicle type
  const carImage = "https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n";
  const autoImage = "https://imgs.search.brave.com/melL_E1WXhsfg8Yd_bvuYDVAtWcWDi9anJMBm_SOAfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjYv/MTE0Lzk0MS9zbWFs/bC9jbmctYXV0by1j/YXItc2lsaG91ZXR0/ZS1saW5lLWFydC1p/bGx1c3RyYXRpb24t/b2YtZWNvLWZyaWVu/ZGx5LXJpY2tzaGF3/LWZyZWUtcG5nLnBu/Zw";
  const motoImage = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";

  let selectedVehicleImage = carImage; // Default to car image
  let imageClassName = "h-20"; // Default class name

  // Conditionally set the image source and class name based on vehicleType
  if (props.vehicleType === "auto") {
    selectedVehicleImage = autoImage;
  } else if (props.vehicleType === "moto") {
    selectedVehicleImage = motoImage;
    imageClassName = "h-16 scale-x-[-1]"; // Apply specific class for moto
  }

  return (
    <div className="relative px-4 py-6 bg-white shadow-lg rounded-t-xl">
      {/* Close Button */}
      <button
        onClick={() => props.setConfirmRidePanel(false)}
        className="absolute top-0 left-0 w-full text-gray-600 hover:text-gray-800 text-3xl flex justify-center items-center py-3"
        aria-label="Close confirmation panel"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Panel Title */}
      <h3 className="text-xl font-bold text-center mb-6 pt-4">CONFIRM YOUR RIDE</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        {/* Dynamic Vehicle Image */}
        <img className={imageClassName} src={selectedVehicleImage} alt={`Selected ${props.vehicleType}`} />

        <div className="w-full mt-5 space-y-3"> {/* Added space-y-3 for better spacing */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-map-pin-fill text-gray-600"></i> {/* Added text-gray-600 for icons */}
            <div>
              <h3 className="text-base font-medium">{props.pickup}</h3> {/* Changed to text-base */}
              <p className="text-sm -mt-1 text-gray-500">Pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t border-gray-200"> {/* Added border-gray-200 for subtle line */}
            <i className="ri-map-pin-3-line text-lg text-gray-600"></i>
            <div>
              <h3 className="text-base font-medium">{props.destination}</h3>
              <p className="text-sm -mt-1 text-gray-500">Destination</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t border-gray-200">
            <i className="ri-money-rupee-circle-line text-lg text-gray-600"></i>
            <div>
              <h3 className="text-xl font-bold">₹{props.fare?.[props.vehicleType]}</h3> {/* Made fare larger and bolder */}
              <p className="text-sm -mt-1 text-gray-500">Fare</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(false);
            props.createRide();
          }}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200" // Enhanced button styles
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;