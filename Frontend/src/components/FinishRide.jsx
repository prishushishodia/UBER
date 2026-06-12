import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TripRoute from "./TripRoute";

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate();
  const [ending, setEnding] = useState(false);

  async function endRide() {
    setEnding(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.status === 200) {
        setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    } finally {
      setEnding(false);
    }
  }

  const firstName = ride?.user?.fullname?.firstname || "";
  const lastName = ride?.user?.fullname?.lastname || "";
  const initials = (firstName[0] || "") + (lastName[0] || "") || "R";

  return (
    <div className="flex h-full flex-col bg-night">
      {/* Header */}
      <div className="animate-fade-up flex-shrink-0 border-b border-night-line px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="chip bg-go/15 text-go">
              <i className="ri-flag-2-fill text-xs" />
              Arrived at destination
            </span>
            <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-white">
              Finish this trip
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={() => setFinishRidePanel(false)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-night-line bg-night-soft text-night-fog transition hover:text-white"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
        {/* Rider + collectable fare */}
        <div
          className="tile-dark animate-fade-up flex items-center gap-3.5 px-4 py-3"
          style={{ animationDelay: "90ms" }}
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold">
            <span className="text-base font-extrabold text-night uppercase">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-white capitalize">
              {firstName} {lastName}
            </h3>
            <p className="text-xs text-night-fog">Rider</p>
          </div>
          <div className="rounded-xl border border-night-line bg-night px-3 py-2 text-right">
            <p className="text-[10px] text-night-fog">Collect</p>
            <p className="text-base font-extrabold text-gold">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route recap */}
        <div className="animate-fade-up" style={{ animationDelay: "170ms" }}>
          <TripRoute pickup={ride?.pickup} destination={ride?.destination} variant="dark" />
        </div>

        <p
          className="animate-fade-up flex items-start justify-center gap-1.5 px-4 text-center text-xs text-night-fog/80"
          style={{ animationDelay: "240ms" }}
        >
          <i className="ri-information-line mt-0.5" />
          Only finish the trip once you've collected the cash payment from the rider.
        </p>
      </div>

      {/* CTA */}
      <div className="animate-fade-up flex-shrink-0 px-5 pt-3 pb-9" style={{ animationDelay: "300ms" }}>
        <button onClick={endRide} disabled={ending} className="btn-gold">
          {ending ? (
            <>
              <span className="spinner" /> Finishing…
            </>
          ) : (
            <>
              <i className="ri-check-double-line text-base" />
              Finish trip · ₹{ride?.fare ?? "—"} collected
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
