import React from "react";
import TripRoute from "./TripRoute";

const RidePopUp = ({ ride, confirmRide, setRidePopUpPanel }) => {
  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";
  const initials = (firstName[0] || "") + (lastName[0] || "") || "R";

  return (
    <div className="sheet-dark">
      {/* Drag handle — tap to dismiss */}
      <div className="cursor-pointer pt-3 pb-1" onClick={() => setRidePopUpPanel(false)}>
        <div className="grab-dark" />
      </div>

      {/* key retriggers the entrance stagger for each new request */}
      <div key={ride?._id || "empty"} className="px-5 pt-2 pb-7">
        {/* Header */}
        <div className="animate-fade-up mb-5 flex items-center justify-between">
          <div>
            <span className="chip bg-gold/15 text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              New request
            </span>
            <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-white">
              Ride nearby
            </h2>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-gold/15 px-3.5 py-2 text-right">
            <p className="text-[10px] font-bold tracking-wide text-gold/70 uppercase">Fare</p>
            <p className="text-base font-extrabold text-gold">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Rider card */}
        <div
          className="tile-dark animate-fade-up mb-4 flex items-center gap-3.5 px-4 py-3"
          style={{ animationDelay: "90ms" }}
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold">
            <span className="text-sm font-extrabold text-night uppercase">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-white capitalize">
              {firstName} {lastName}
            </h3>
            <p className="text-xs text-night-fog">Rider</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <i className="ri-star-fill text-gold" /> 4.9
          </div>
        </div>

        {/* Route */}
        <div className="animate-fade-up" style={{ animationDelay: "170ms" }}>
          <TripRoute pickup={ride?.pickup} destination={ride?.destination} variant="dark" className="mb-5" />
        </div>

        {/* Actions */}
        <div className="animate-fade-up flex gap-3" style={{ animationDelay: "250ms" }}>
          <button onClick={() => setRidePopUpPanel(false)} className="btn-ghost-dark flex-1">
            Ignore
          </button>
          <button onClick={confirmRide} className="btn-gold flex-[2]">
            Accept ride
            <i className="ri-arrow-right-line text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
