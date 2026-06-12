import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import Logo from "../components/Logo";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign you in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-mist px-6 py-10">
      <div>
        <Logo size="lg" className="mb-9 animate-fade-in" />

        <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-ink">Welcome back</h1>
          <p className="mb-8 text-sm text-fog">Sign in to request your next ride</p>
        </div>

        <form
          onSubmit={submitHandler}
          className="animate-fade-up flex flex-col gap-4"
          style={{ animationDelay: "160ms" }}
        >
          <div>
            <label className="form-label" htmlFor="email">
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
              className="field"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="password">
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
                className="field pr-12"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-fog transition hover:text-ink"
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          {error && (
            <div className="animate-fade-in flex items-start gap-2 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3">
              <i className="ri-error-warning-line mt-0.5 text-sm text-danger" />
              <p className="text-xs leading-relaxed font-medium text-danger">{error}</p>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-ink mt-1">
            {submitting ? (
              <>
                <span className="spinner" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-5 animate-fade-up text-center text-sm text-fog" style={{ animationDelay: "240ms" }}>
          New to Uber?{" "}
          <Link to="/signup" className="font-bold text-ink underline underline-offset-2">
            Create an account
          </Link>
        </p>

        {/* Demo credentials */}
        <div
          className="tile mt-6 animate-fade-up border-dashed px-4 py-3"
          style={{ animationDelay: "300ms" }}
        >
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-fog uppercase">
            <i className="ri-flask-line" /> Demo account
          </p>
          <p className="text-xs text-soot">
            Email: <span className="font-semibold">trial@gmail.com</span> · Password:{" "}
            <span className="font-semibold">trial1234</span>
          </p>
        </div>
      </div>

      {/* Switch persona */}
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "360ms" }}>
        <Link to="/captain-login" className="btn-go">
          <i className="ri-steering-2-line text-base" />
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
