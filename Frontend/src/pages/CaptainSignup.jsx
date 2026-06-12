import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import Logo from "../components/Logo";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
        fullname: { firstname: firstName, lastname: lastName },
        email,
        password,
        vehicle: {
          colour: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType,
        },
      });
      if (response.status === 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Couldn't create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-night px-6 py-12 pb-16">
      <Logo variant="dark" size="lg" badge="Captain" className="mb-10 animate-fade-in" />

      <div className="animate-fade-up mb-9" style={{ animationDelay: "80ms" }}>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">Become a captain</h1>
        <p className="text-sm text-night-fog">Create your driver account and start earning</p>
      </div>

      <form
        onSubmit={submitHandler}
        className="animate-fade-up flex flex-col gap-5"
        style={{ animationDelay: "160ms" }}
      >
        {/* Personal details */}
        <div>
          <label className="form-label-dark">Full name</label>
          <div className="flex gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              className="field-dark w-1/2"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              className="field-dark w-1/2"
            />
          </div>
        </div>

        <div>
          <label className="form-label-dark" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="field-dark"
          />
        </div>

        <div>
          <label className="form-label-dark" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              className="field-dark pr-12"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-night-fog transition hover:text-gold"
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
            </button>
          </div>
        </div>

        {/* Vehicle section */}
        <div className="pt-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-night-line" />
            <span className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-gold uppercase">
              <i className="ri-roadster-line text-sm" /> Your vehicle
            </span>
            <div className="h-px flex-1 bg-night-line" />
          </div>

          <div className="mb-3 flex gap-3">
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              placeholder="Colour"
              className="field-dark w-1/2"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              placeholder="Plate number"
              className="field-dark w-1/2"
            />
          </div>
          <div className="flex gap-3">
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="number"
              min="1"
              placeholder="Seats"
              className="field-dark w-1/2"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className={`field-dark w-1/2 ${vehicleType ? "" : "text-night-fog/50"}`}
            >
              <option value="" disabled className="bg-night-soft">
                Vehicle type
              </option>
              <option value="car" className="bg-night-soft text-white">
                Car
              </option>
              <option value="auto" className="bg-night-soft text-white">
                Auto
              </option>
              <option value="moto" className="bg-night-soft text-white">
                Moto
              </option>
            </select>
          </div>
        </div>

        {error && (
          <div className="animate-fade-in flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3">
            <i className="ri-error-warning-line mt-0.5 text-sm text-danger" />
            <p className="text-xs leading-relaxed font-medium text-danger">{error}</p>
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-gold mt-1">
          {submitting ? (
            <>
              <span className="spinner" /> Creating account…
            </>
          ) : (
            "Create captain account"
          )}
        </button>

        <p className="text-center text-sm text-night-fog">
          Already a captain?{" "}
          <Link to="/captain-login" className="font-bold text-gold">
            Sign in
          </Link>
        </p>
      </form>

      <p className="mt-8 text-center text-[10px] leading-relaxed text-night-fog/60">
        Protected by reCAPTCHA · Google Privacy Policy · Terms of Service
      </p>
    </div>
  );
};

export default CaptainSignup;
