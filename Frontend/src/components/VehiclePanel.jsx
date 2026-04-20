import React from "react";

const vehicles = [
  {
    type: "car",
    name: "UberGo",
    desc: "Affordable compact rides",
    capacity: 4,
    eta: "3 min",
    img: "https://imgs.search.brave.com/CMLbPLH7Ll2IYDQWDJlV_dvFOcx3cXDKDFXTM-tz19g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NjAwLzczNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n",
    imgClass: "h-14 object-contain",
  },
  {
    type: "auto",
    name: "UberAuto",
    desc: "Affordable auto rides",
    capacity: 3,
    eta: "5 min",
    img: "https://imgs.search.brave.com/melL_E1WXhsfg8Yd_bvuYDVAtWcWDi9anJMBm_SOAfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjYv/MTE0Lzk0MS9zbWFs/bC9jbmctYXV0by1j/YXItc2lsaG91ZXR0/ZS1saW5lLWFydC1p/bGx1c3RyYXRpb24t/b2YtZWNvLWZyaWVu/ZGx5LXJpY2tzaGF3/LWZyZWUtcG5nLnBu/Zw",
    imgClass: "h-14 object-contain",
  },
  {
    type: "moto",
    name: "UberMoto",
    desc: "Fast & economical",
    capacity: 1,
    eta: "2 min",
    img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    imgClass: "h-12 object-contain scale-x-[-1]",
  },
];

const VehiclePanel = ({ fare, selectVehicle, setConfirmRidePanel, setVehiclePanel }) => {
  return (
    <div className="bg-white rounded-t-3xl shadow-2xl">
      {/* Drag handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-pointer"
        onClick={() => setVehiclePanel(false)}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="px-5 pb-6">
        <h2 className="text-lg font-bold text-[#111] mb-4">Choose a ride</h2>

        <div className="flex flex-col gap-3">
          {vehicles.map((v) => (
            <div
              key={v.type}
              onClick={() => {
                selectVehicle(v.type);
                setConfirmRidePanel(true);
              }}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent bg-[#F6F6F6] active:border-black active:bg-white transition-all cursor-pointer"
            >
              {/* Vehicle image */}
              <div className="w-16 flex-shrink-0 flex items-center justify-center">
                <img src={v.img} alt={v.name} className={v.imgClass} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#111]">{v.name}</h3>
                  <span className="text-xs text-[#6B7280] flex items-center gap-0.5">
                    <i className="ri-user-fill text-[10px]" />
                    {v.capacity}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">{v.eta} away · {v.desc}</p>
              </div>

              {/* Fare */}
              <div className="flex-shrink-0 text-right">
                <p className="text-base font-bold text-[#111]">
                  ₹{fare?.[v.type] ?? "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
