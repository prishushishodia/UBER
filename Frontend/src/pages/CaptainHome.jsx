import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
import Logo from "../components/Logo";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);
  const bottomCardRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // Entrance animation for bottom card
  useEffect(() => {
    if (bottomCardRef.current) {
      gsap.from(bottomCardRef.current, {
        y: 60, opacity: 0, duration: 0.65, ease: "power3.out", delay: 0.2,
      });
    }
  }, []);

  useEffect(() => {
    if (!socket || !captain?._id) return;
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, [socket, captain?._id]);

  const confirmRide = async () => {
    if (!ride?._id) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopUpPanel(true);
    });
    return () => socket.off("new-ride");
  }, [socket]);

  useEffect(() => {
    gsap.set(ridePopUpPanelRef.current, { y: "100%" });
    gsap.set(confirmRidePopUpRef.current, { y: "100%" });
  }, []);

  useGSAP(() => {
    gsap.to(ridePopUpPanelRef.current, { y: ridePopUpPanel ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopUpRef.current, { y: confirmRidePopUpPanel ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [confirmRidePopUpPanel]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-night">
      {/* Top bar */}
      <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-4 pt-4">
        <div className="animate-fade-in rounded-2xl border border-white/10 bg-night/80 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <Logo variant="dark" size="sm" badge="Captain" />
        </div>
        <Link to="/captain-login" aria-label="Sign out" className="map-action-dark animate-fade-in">
          <i className="ri-logout-box-r-line" />
        </Link>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking variant="dark" />
      </div>

      {/* Bottom captain card */}
      <div ref={bottomCardRef} className="absolute right-0 bottom-0 left-0 z-30">
        <div className="sheet-dark px-5 pt-4 pb-7">
          {/* Drag pill */}
          <div className="mb-4">
            <div className="grab-dark" />
          </div>
          <CaptainDetails />
        </div>
      </div>

      {/* Incoming ride request */}
      <div ref={ridePopUpPanelRef} className="fixed right-0 bottom-0 left-0 z-50">
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* OTP / start ride screen */}
      <div ref={confirmRidePopUpRef} className="fixed inset-0 z-50">
        <ConfirmRidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
