import React from "react";

/**
 * Text wordmark logo. Replaces the remote PNG so it renders crisp on any
 * background with no network dependency.
 *
 * variant: "light" → dark text (for light pages)
 *          "dark"  → white text (for dark pages)
 * badge:   optional pill rendered next to the wordmark (e.g. "Captain")
 */
const Logo = ({ variant = "light", badge, size = "md", className = "" }) => {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl" };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`leading-none font-extrabold tracking-tight ${sizes[size]} ${
          variant === "dark" ? "text-white" : "text-ink"
        }`}
      >
        Uber
      </span>
      {badge && (
        <span className="rounded-lg bg-gold px-2.5 py-1 text-[10px] font-extrabold tracking-[0.18em] text-night uppercase">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Logo;
