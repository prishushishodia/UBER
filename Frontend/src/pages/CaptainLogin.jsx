import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Logo from "../components/Logo";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign you in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-night px-6 py-12">
      <div>
        <Logo variant="dark" size="lg" badge="Captain" className="mb-10 animate-fade-in" />

        <div className="animate-fade-up mb-9" style={{ animationDelay: "80ms" }}>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">Welcome back</h1>
          <p className="text-sm text-night-fog">Sign in and hit the road</p>
        </div>

        <form
          onSubmit={submitHandler}
          className="animate-fade-up flex flex-col gap-5"
          style={{ animationDelay: "160ms" }}
        >
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
                autoComplete="current-password"
                placeholder="Enter your password"
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

          {error && (
            <div className="animate-fade-in flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3">
              <i className="ri-error-warning-line mt-0.5 text-sm text-danger" />
              <p className="text-xs leading-relaxed font-medium text-danger">{error}</p>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-gold">
            {submitting ? (
              <>
                <span className="spinner" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <p className="text-center text-sm text-night-fog">
            New captain?{" "}
            <Link to="/captain-signup" className="font-bold text-gold">
              Register here
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="tile-dark border-dashed px-4 py-3">
            <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-gold uppercase">
              <i className="ri-flask-line" /> Demo account
            </p>
            <p className="text-xs text-night-fog">
              Email: <span className="font-semibold text-white">trial1@gmail.com</span> · Password:{" "}
              <span className="font-semibold text-white">trial1234</span>
            </p>
          </div>
        </form>
      </div>

      {/* Switch persona */}
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "280ms" }}>
        <Link to="/login" className="btn-ghost-dark">
          <i className="ri-user-3-line text-base" />
          Switch to Rider sign in
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
