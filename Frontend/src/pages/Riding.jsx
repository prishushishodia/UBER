import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import TripRoute from "../components/TripRoute";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ride-ended", () => navigate("/home"));
    return () => socket.off("ride-ended");
  }, []);

  const captainFirstName = ride?.captain?.fullname?.firstname || "";
  const captainLastName = ride?.captain?.fullname?.lastname || "";
  const initials = (captainFirstName[0] || "") + (captainLastName[0] || "") || "C";

  return (
    <div className="flex h-screen flex-col bg-mist">
      {/* Home shortcut */}
      <Link to="/home" aria-label="Back to home" className="map-action animate-fade-in fixed top-4 right-4 z-50">
        <i className="ri-home-5-line text-lg" />
      </Link>

      {/* Map fills whatever space the trip panel doesn't need */}
      <div className="min-h-0 w-full flex-1">
        <LiveTracking />
      </div>

      {/* Trip panel — natural height so all content stays visible without scrolling */}
      <div className="sheet animate-fade-up -mt-6 flex flex-none flex-col px-5 pt-5 pb-6">
        <div>
          {/* Status + heading */}
          <span className="chip bg-go/10 text-go">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-go" />
            On the way
          </span>
          <h2 className="mt-2 mb-4 text-xl font-extrabold tracking-tight text-ink">
            Enjoy your ride{ride?.user?.fullname?.firstname ? `, ${ride.user.fullname.firstname}` : ""}
          </h2>

          {/* Captain strip */}
          <div className="tile mb-4 flex items-center gap-3.5 px-4 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink">
              <span className="text-sm font-extrabold text-white uppercase">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-ink capitalize">
                {captainFirstName} {captainLastName}
              </p>
              <p className="text-xs text-fog">
                {ride?.captain?.vehicle?.plate || "—"} · Your captain
              </p>
            </div>
            <i className="ri-shield-check-fill text-lg text-go" />
          </div>

          {/* Trip summary */}
          <TripRoute pickup={ride?.pickup} destination={ride?.destination} fare={ride?.fare} />
        </div>

        {/* Payment */}
        <button className="btn-ink mt-4">
          <i className="ri-cash-line text-base" />
          Pay ₹{ride?.fare ?? "—"} in cash
        </button>
      </div>
    </div>
  );
};

export default Riding;
