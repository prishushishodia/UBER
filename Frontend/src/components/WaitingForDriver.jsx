import React from "react";
import TripRoute from "./TripRoute";

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  const captainFirstName = ride?.captain?.fullname?.firstname || "";
  const captainLastName = ride?.captain?.fullname?.lastname || "";
  const initials = (captainFirstName[0] || "") + (captainLastName[0] || "") || "C";
  const otpDigits = String(ride?.otp ?? "").split("");

  return (
    <div className="sheet px-5 pt-3 pb-6">
      {/* Drag handle — tap to dismiss */}
      <div className="cursor-pointer pb-3" onClick={() => setWaitingForDriver(false)}>
        <div className="grab" />
      </div>

      {/* Status */}
      <div className="mb-4">
        <span className="chip bg-go/10 text-go">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-go" />
          </span>
          Captain on the way
        </span>
        <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink">Your ride is confirmed</h2>
        <p className="mt-0.5 text-xs text-fog">Share the OTP with your captain to start the trip</p>
      </div>

      {/* Captain card */}
      <div className="tile mb-4 flex items-center gap-3.5 px-4 py-3.5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink">
          <span className="text-base font-extrabold text-white uppercase">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-ink capitalize">
            {captainFirstName} {captainLastName}
          </h3>
          <span className="mt-1 inline-block rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-bold tracking-widest text-soot uppercase">
            {ride?.captain?.vehicle?.plate || "—"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-ink">
          <i className="ri-star-fill text-gold" /> 4.8
        </div>
      </div>

      {/* OTP — segmented digits */}
      <div className="mb-4 rounded-2xl bg-ink p-4">
        <p className="mb-2.5 text-center text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
          Your ride OTP
        </p>
        <div className="flex justify-center gap-2">
          {(otpDigits.length ? otpDigits : Array(6).fill("•")).map((d, i) => (
            <span
              key={i}
              className="flex h-11 w-9 items-center justify-center rounded-lg bg-white/10 text-lg font-extrabold text-white"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Trip summary */}
      <TripRoute pickup={ride?.pickup} destination={ride?.destination} fare={ride?.fare} />
    </div>
  );
};

export default WaitingForDriver;
