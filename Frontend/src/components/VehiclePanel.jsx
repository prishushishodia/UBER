import React, { useState } from "react";
import VehicleIcon from "./VehicleIcon";

const vehicles = [
  {
    type: "car",
    name: "Uber Go",
    desc: "Compact, comfy everyday rides",
    capacity: 4,
    eta: "3 min",
  },
  {
    type: "auto",
    name: "Uber Auto",
    desc: "Quick auto-rickshaw trips",
    capacity: 3,
    eta: "5 min",
  },
  {
    type: "moto",
    name: "Uber Moto",
    desc: "Beat the traffic, ride solo",
    capacity: 1,
    eta: "2 min",
  },
];

const VehiclePanel = ({ fare, selectVehicle, setConfirmRidePanel, setVehiclePanel }) => {
  const [selected, setSelected] = useState("car");

  const choose = (type) => {
    setSelected(type);
    selectVehicle(type);
  };

  const selectedVehicle = vehicles.find((v) => v.type === selected);

  return (
    <div className="sheet">
      {/* Drag handle — tap to dismiss */}
      <div className="cursor-pointer pt-3 pb-2" onClick={() => setVehiclePanel(false)}>
        <div className="grab" />
      </div>

      <div className="px-5 pb-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Choose your ride</h2>
          <button
            aria-label="Close"
            onClick={() => setVehiclePanel(false)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-mist text-fog transition hover:text-ink"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Vehicle options */}
        <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Ride options">
          {vehicles.map((v) => {
            const isSelected = selected === v.type;
            return (
              <button
                key={v.type}
                role="radio"
                aria-checked={isSelected}
                onClick={() => choose(v.type)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 p-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-ink bg-white shadow-md shadow-ink/5"
                    : "border-transparent bg-mist hover:bg-line/50"
                }`}
              >
                {/* Vehicle illustration */}
                <span className={`flex-shrink-0 transition-colors ${isSelected ? "text-ink" : "text-soot/70"}`}>
                  <VehicleIcon type={v.type} className="h-11 w-16" />
                </span>

                {/* Info */}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-ink">{v.name}</h3>
                    <span className="flex items-center gap-0.5 text-xs text-fog">
                      <i className="ri-user-fill text-[10px]" />
                      {v.capacity}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-fog">
                    {v.eta} away · {v.desc}
                  </span>
                </span>

                {/* Fare */}
                <span className="flex-shrink-0 text-right">
                  <p className="text-base font-extrabold text-ink">₹{fare?.[v.type] ?? "—"}</p>
                  {isSelected && (
                    <i className="ri-checkbox-circle-fill animate-fade-in text-base text-go" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Confirm selection */}
        <button
          onClick={() => {
            selectVehicle(selected);
            setConfirmRidePanel(true);
          }}
          className="btn-ink mt-4"
        >
          Choose {selectedVehicle?.name}
          <i className="ri-arrow-right-line text-base" />
        </button>
      </div>
    </div>
  );
};

export default VehiclePanel;
