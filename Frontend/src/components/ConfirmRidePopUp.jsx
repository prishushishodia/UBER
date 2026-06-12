import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripRoute from "./TripRoute";

const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e?.preventDefault();
    setError("");
    setStarting(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: { rideId: ride._id, otp },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        setConfirmRidePopUpPanel(false);
        setRidePopUpPanel(false);
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (err) {
      console.error("Error starting ride:", err);
      setError("That OTP didn't match. Ask the rider and try again.");
    } finally {
      setStarting(false);
    }
  };

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
              <i className="ri-checkbox-circle-fill text-xs" />
              Ride accepted
            </span>
            <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-white">
              Start the trip
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={() => setConfirmRidePopUpPanel(false)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-night-line bg-night-soft text-night-fog transition hover:text-white"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
        <p className="mt-1.5 text-sm text-night-fog">Ask the rider for their OTP to begin</p>
      </div>

      {/* Scrollable body */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
        {/* Rider card */}
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
          <div className="rounded-xl border border-night-line bg-night px-3 py-1.5 text-right">
            <p className="text-[10px] text-night-fog">Fare</p>
            <p className="text-sm font-extrabold text-gold">₹{ride?.fare}</p>
          </div>
        </div>

        {/* Route */}
        <div className="animate-fade-up" style={{ animationDelay: "170ms" }}>
          <TripRoute pickup={ride?.pickup} destination={ride?.destination} variant="dark" />
        </div>

        {/* OTP input */}
        <div className="tile-dark animate-fade-up p-5" style={{ animationDelay: "250ms" }}>
          <label
            htmlFor="ride-otp"
            className="mb-3 block text-[11px] font-extrabold tracking-[0.18em] text-gold uppercase"
          >
            <i className="ri-key-2-line mr-1" />
            Enter rider's OTP
          </label>
          <input
            id="ride-otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="••••••"
            required
            className="w-full rounded-xl border border-night-line bg-night px-4 py-4 text-center text-2xl font-extrabold tracking-[0.5em] text-gold transition outline-none placeholder:tracking-[0.3em] placeholder:text-night-fog/40 focus:border-gold focus:ring-2 focus:ring-gold/15"
          />
          {error && (
            <p className="animate-fade-in mt-3 flex items-center gap-1.5 text-xs font-medium text-danger">
              <i className="ri-error-warning-line" />
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        className="animate-fade-up flex flex-shrink-0 flex-col gap-3 px-5 pt-3 pb-9"
        style={{ animationDelay: "320ms" }}
      >
        <button onClick={submitHandler} disabled={starting || otp.length !== 6} className="btn-gold">
          {starting ? (
            <>
              <span className="spinner" /> Starting…
            </>
          ) : (
            <>
              Start ride
              <i className="ri-arrow-right-line text-base" />
            </>
          )}
        </button>
        <button
          onClick={() => {
            setRidePopUpPanel(false);
            setConfirmRidePopUpPanel(false);
          }}
          className="btn-ghost-dark"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
