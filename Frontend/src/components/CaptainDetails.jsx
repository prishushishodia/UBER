import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const stats = [
  { icon: "ri-time-line", value: "10.2", label: "Hours online" },
  { icon: "ri-route-line", value: "8", label: "Trips today" },
  { icon: "ri-star-fill", value: "4.8", label: "Rating", highlight: true },
];

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain?.fullname) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-night-fog">
        <span className="spinner" />
        <p className="text-sm">Loading your profile…</p>
      </div>
    );
  }

  const initials =
    (captain.fullname.firstname?.[0] || "") + (captain.fullname.lastname?.[0] || "") || "C";

  return (
    <div>
      {/* Identity + earnings */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Avatar with online indicator */}
          <div className="relative">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold">
              <span className="text-base font-extrabold text-night uppercase">{initials}</span>
            </div>
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-night bg-go">
              <span className="absolute inset-0 animate-ping rounded-full bg-go opacity-75" />
            </span>
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white capitalize">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <span className="mt-1 inline-block rounded-md border border-night-line bg-night-soft px-2 py-0.5 text-[10px] font-bold tracking-widest text-night-fog uppercase">
              {captain.vehicle?.plate || "—"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold tracking-tight text-gold">₹300</p>
          <p className="text-[11px] font-medium text-night-fog">Earned today</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`animate-fade-up rounded-2xl p-3.5 text-center ${
              s.highlight ? "bg-gold" : "tile-dark"
            }`}
            style={{ animationDelay: `${200 + i * 90}ms` }}
          >
            <i className={`${s.icon} text-lg ${s.highlight ? "text-night" : "text-gold"}`} />
            <p className={`mt-1 text-base font-extrabold ${s.highlight ? "text-night" : "text-white"}`}>
              {s.value}
            </p>
            <p className={`mt-0.5 text-[10px] font-medium ${s.highlight ? "text-night/70" : "text-night-fog"}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptainDetails;
