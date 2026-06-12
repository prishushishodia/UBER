import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Start = () => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-between bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1064&auto=format&fit=crop)] bg-cover bg-center">
      {/* Gradient scrim — darker at the edges, keeps the photo readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

      {/* Wordmark */}
      <div className="relative z-10 animate-fade-in pt-12 pl-7">
        <span className="text-4xl font-extrabold tracking-tight text-white">Uber</span>
      </div>

      {/* Hero copy floating over the photo */}
      <div className="relative z-10 px-7 pb-8">
        <h1
          className="animate-fade-up text-4xl leading-tight font-extrabold text-white"
          style={{ animationDelay: "120ms" }}
        >
          Move the way
          <br />
          you want
        </h1>
      </div>

      {/* Bottom card */}
      <div className="sheet animate-fade-up relative z-10 px-6 pt-8 pb-10" style={{ animationDelay: "220ms" }}>
        <h2 className="mb-1.5 text-2xl font-extrabold tracking-tight text-ink">
          Get started with Uber
        </h2>
        <p className="mb-7 text-sm text-fog">
          Tap a button, get a ride. Reliable, anytime, anywhere.
        </p>

        <Link to="/login" className="btn-ink">
          Continue
          <i className="ri-arrow-right-line text-base" />
        </Link>

        <p className="mt-5 text-center text-xs text-fog">
          Driving with us?{" "}
          <Link to="/captain-login" className="font-bold text-ink underline underline-offset-2">
            Sign in as Captain
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Start;
