import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full relative flex flex-col justify-between bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Logo */}
      <div className="relative z-10 pt-10 pl-6">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* Bottom card */}
      <div className="relative z-10 bg-white rounded-t-3xl px-6 pt-8 pb-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#111] mb-2 leading-snug">
          Get started with UBER
        </h2>
        <p className="text-[#6B7280] text-sm mb-6">
          Your reliable ride, anytime anywhere.
        </p>
        <Link
          to="/login"
          className="w-full flex items-center justify-center bg-black text-white font-semibold py-4 rounded-2xl text-base tracking-wide active:scale-95 transition-transform"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
