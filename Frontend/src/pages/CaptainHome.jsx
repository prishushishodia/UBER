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

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

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
    gsap.to(ridePopUpPanelRef.current, { y: ridePopUpPanel ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopUpRef.current, { y: confirmRidePopUpPanel ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#F6F6F6]">
      {/* Logo */}
      <img
        className="w-14 absolute left-4 top-4 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      {/* Logout */}
      <Link
        to="/home"
        className="absolute right-4 top-4 z-20 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
      >
        <i className="ri-logout-box-r-line text-[#111]" />
      </Link>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Bottom captain details card */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-white rounded-t-3xl shadow-2xl px-5 pt-4 pb-6">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <CaptainDetails />
        </div>
      </div>

      {/* Ride popup */}
      <div ref={ridePopUpPanelRef} className="fixed bottom-0 left-0 right-0 z-50">
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* Confirm ride popup — full height */}
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
