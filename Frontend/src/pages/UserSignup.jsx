import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import Logo from "../components/Logo";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
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
    <div className="flex min-h-screen flex-col justify-between bg-mist px-6 py-10">
      <div>
        <Logo size="lg" className="mb-9 animate-fade-in" />

        <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-ink">Create your account</h1>
          <p className="mb-8 text-sm text-fog">Riding with Uber takes minutes to set up</p>
        </div>

        <form
          onSubmit={submitHandler}
          className="animate-fade-up flex flex-col gap-4"
          style={{ animationDelay: "160ms" }}
        >
          <div>
            <label className="form-label">Full name</label>
            <div className="flex gap-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                className="field w-1/2"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                className="field w-1/2"
              />
            </div>
          </div>

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
                autoComplete="new-password"
                placeholder="Create a password"
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
                <span className="spinner" /> Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-5 animate-fade-up text-center text-sm text-fog" style={{ animationDelay: "240ms" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-ink underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>

      <p className="mt-8 text-center text-[10px] leading-relaxed text-fog">
        This site is protected by reCAPTCHA and the{" "}
        <span className="underline">Google Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service</span> apply.
      </p>
    </div>
  );
};

export default UserSignup;
