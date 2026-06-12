import React from "react";

/**
 * Local flat SVG vehicle illustrations (the previous remote image URLs
 * were dead links). Drawn with currentColor so they inherit text color;
 * windows/hubs use white for a simple two-tone look.
 */

const Car = () => (
  <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path
      d="M6 28c-1.7 0-3-1.4-3-3v-1.2c0-2.5 1.8-4.6 4.3-5l6.6-1.1 5.5-6.1c1.9-2.1 4.4-3.2 7-3.2h10.8c2.8 0 5.5 1.2 7.3 3.4l4.5 5.3 6.4 1.3c2.4.5 4.1 2.6 4.1 5v1.6c0 1.7-1.3 3-3 3H6Z"
      fill="currentColor"
    />
    <path d="M33 11.4v6.1h-8.6l3.5-3.9c1.1-1.4 2.7-2.2 4.4-2.2h.7Z" fill="#fff" opacity="0.9" />
    <path d="M36 11.4h1.4c1.9 0 3.7.8 4.9 2.3l3.1 3.8H36v-6.1Z" fill="#fff" opacity="0.9" />
    <circle cx="17.5" cy="29.5" r="5" fill="currentColor" />
    <circle cx="17.5" cy="29.5" r="2" fill="#fff" opacity="0.9" />
    <circle cx="46.5" cy="29.5" r="5" fill="currentColor" />
    <circle cx="46.5" cy="29.5" r="2" fill="#fff" opacity="0.9" />
  </svg>
);

const Auto = () => (
  <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path
      d="M9 28c-1.7 0-3-1.3-3-3V15.5C6 10.3 10.3 6 15.5 6h13.9c2.6 0 5 1.2 6.6 3.2l5.6 7h7.2c3.4 0 6.2 2.8 6.2 6.2v2.6c0 1.7-1.3 3-3 3H9Z"
      fill="currentColor"
    />
    <path d="M12.5 16.5v-1c0-3.6 2.9-6.5 6.5-6.5h6v7.5h-12.5Z" fill="#fff" opacity="0.9" />
    <path d="M28.5 9h.9c1.6 0 3.2.8 4.2 2.1l3.9 4.9h-9V9Z" fill="#fff" opacity="0.9" />
    <circle cx="17" cy="29.5" r="5" fill="currentColor" />
    <circle cx="17" cy="29.5" r="2" fill="#fff" opacity="0.9" />
    <circle cx="45" cy="29.5" r="5" fill="currentColor" />
    <circle cx="45" cy="29.5" r="2" fill="#fff" opacity="0.9" />
  </svg>
);

const Moto = () => (
  <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    {/* handlebar + fork */}
    <path d="M41 9.5h6.2c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6h-1.6l5.6 14.5-3 1.2-5.9-15.7H41c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6Z" fill="currentColor" />
    {/* seat + body + footboard */}
    <path
      d="M12.6 13.2h8.9c2.3 0 4.4 1.1 5.7 3l3.6 5.3h9.7l-1.9 5.8H26.4c-2.3 0-4.4-1.1-5.7-3l-2.6-3.8h-5.5c-2 0-3.6-1.6-3.6-3.6 0-2 1.6-3.7 3.6-3.7Z"
      fill="currentColor"
    />
    {/* rear rack */}
    <path d="M14.5 20.5 12 28h3.4l2.2-6.4-3.1-1.1Z" fill="currentColor" />
    <circle cx="13.5" cy="30" r="5.5" fill="currentColor" />
    <circle cx="13.5" cy="30" r="2.2" fill="#fff" opacity="0.9" />
    <circle cx="50" cy="30" r="5.5" fill="currentColor" />
    <circle cx="50" cy="30" r="2.2" fill="#fff" opacity="0.9" />
  </svg>
);

const icons = { car: Car, auto: Auto, moto: Moto };

const VehicleIcon = ({ type = "car", className = "h-12 w-16" }) => {
  const Icon = icons[type] || Car;
  return (
    <span className={`inline-block ${className}`}>
      <Icon />
    </span>
  );
};

export default VehicleIcon;
