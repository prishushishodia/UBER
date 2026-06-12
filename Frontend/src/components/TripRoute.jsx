import React from "react";

/**
 * Shared pickup → destination (+ optional fare) summary card.
 * Uses the Uber convention: solid dot = pickup, solid square = destination.
 *
 * variant: "light" | "dark"
 */
const TripRoute = ({ pickup, destination, fare, variant = "light", className = "" }) => {
  const dark = variant === "dark";

  const rowLabel = `text-[10px] font-bold uppercase tracking-[0.12em] ${
    dark ? "text-night-fog" : "text-fog"
  }`;
  const rowValue = `mt-0.5 text-sm font-semibold leading-snug ${
    dark ? "text-white" : "text-ink"
  }`;
  const divider = dark ? "border-night-line" : "border-line";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${divider} ${
        dark ? "bg-night-soft" : "bg-mist"
      } ${className}`}
    >
      {/* Pickup */}
      <div className={`flex items-start gap-3.5 border-b p-4 ${divider}`}>
        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center">
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-gold" : "bg-ink"}`} />
        </span>
        <div className="min-w-0">
          <p className={rowLabel}>Pickup</p>
          <h3 className={rowValue}>{pickup || "—"}</h3>
        </div>
      </div>

      {/* Destination */}
      <div className={`flex items-start gap-3.5 p-4 ${fare != null ? `border-b ${divider}` : ""}`}>
        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center">
          <span className={`h-2.5 w-2.5 ${dark ? "bg-white" : "bg-go"}`} />
        </span>
        <div className="min-w-0">
          <p className={rowLabel}>Destination</p>
          <h3 className={rowValue}>{destination || "—"}</h3>
        </div>
      </div>

      {/* Fare */}
      {fare != null && (
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3.5">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
              <i className={`ri-cash-line text-base ${dark ? "text-gold" : "text-ink"}`} />
            </span>
            <p className={rowLabel}>Cash payment</p>
          </div>
          <p className={`text-base font-extrabold ${dark ? "text-gold" : "text-ink"}`}>₹{fare}</p>
        </div>
      )}
    </div>
  );
};

export default TripRoute;
