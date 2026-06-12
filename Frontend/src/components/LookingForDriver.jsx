import React from "react";
import TripRoute from "./TripRoute";

const LookingForDriver = ({ ride, setVehicleFound }) => {
  return (
    <div className="sheet px-5 pt-3 pb-6">
      {/* Drag handle — tap to dismiss */}
      <div className="cursor-pointer pb-3" onClick={() => setVehicleFound(false)}>
        <div className="grab" />
      </div>

      {/* Header */}
      <h2 className="mb-1 text-xl font-extrabold tracking-tight text-ink">
        Finding your captain
      </h2>
      <p className="mb-6 text-xs text-fog">Hang tight — matching you with a nearby driver</p>

      {/* Radar animation */}
      <div className="mb-3 flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="animate-sonar absolute inset-0 rounded-full bg-go/25" />
          <span className="animate-sonar absolute inset-3 rounded-full bg-go/30 [animation-delay:0.45s]" />
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-ink shadow-xl shadow-ink/25">
            <i className="ri-taxi-wifi-line text-2xl text-white" />
          </div>
        </div>
        <p className="animate-pulse-soft mt-4 text-xs font-medium text-fog">
          Contacting captains near you…
        </p>
      </div>

      {/* Progress shimmer */}
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-mist">
        <div className="animate-scan h-full w-1/3 rounded-full bg-go" />
      </div>

      {/* Trip summary */}
      <TripRoute pickup={ride?.pickup} destination={ride?.destination} fare={ride?.fare} className="mb-5" />

      {/* Cancel search */}
      <button onClick={() => setVehicleFound(false)} className="btn-ghost">
        Cancel search
      </button>
    </div>
  );
};

export default LookingForDriver;
