import React from "react";
import VehicleIcon from "./VehicleIcon";
import TripRoute from "./TripRoute";

const vehicleNames = { car: "Uber Go", auto: "Uber Auto", moto: "Uber Moto" };

const ConfirmRide = ({
  vehicleType,
  pickup,
  destination,
  fare,
  setConfirmRidePanel,
  setVehiclePanel,
  setVehicleFound,
  createRide,
}) => {
  return (
    <div className="sheet">
      {/* Drag handle — tap to go back */}
      <div className="cursor-pointer pt-3 pb-2" onClick={() => setConfirmRidePanel(false)}>
        <div className="grab" />
      </div>

      <div className="px-5 pb-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back to ride options"
              onClick={() => setConfirmRidePanel(false)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-mist text-fog transition hover:text-ink"
            >
              <i className="ri-arrow-left-line text-lg" />
            </button>
            <h2 className="text-xl font-extrabold tracking-tight text-ink">Confirm your ride</h2>
          </div>
        </div>

        {/* Vehicle + fare summary */}
        <div className="tile mb-4 flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="text-ink">
              <VehicleIcon type={vehicleType} className="h-12 w-16" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{vehicleNames[vehicleType] || "Uber Go"}</p>
              <p className="text-xs text-fog">Arrives in a few minutes</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-[0.12em] text-fog uppercase">Fare</p>
            <p className="text-2xl font-extrabold tracking-tight text-ink">
              ₹{fare?.[vehicleType] ?? "—"}
            </p>
          </div>
        </div>

        {/* Route summary */}
        <TripRoute pickup={pickup} destination={destination} className="mb-5" />

        {/* Confirm */}
        <button
          onClick={() => {
            setVehicleFound(true);
            setConfirmRidePanel(false);
            setVehiclePanel(false);
            createRide();
          }}
          className="btn-ink"
        >
          Confirm ride
          <i className="ri-check-line text-base" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
