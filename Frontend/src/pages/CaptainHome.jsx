import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios'; // ✅ Add this line
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

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });



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

    // return () => clearInterval(locationInterval);
  }, [socket, captain]);

    const handleAcceptRide = () => {
    if (!ride?._id || !socket || !captain?._id) return;

    console.log("📡 Emitting 'accept-ride' to server...");
    
    // 1. Emit the event to the server
    socket.emit("accept-ride", {
      rideId: ride._id,
      captainId: captain._id,
    });

    // 2. Immediately update the captain's UI for a responsive feel
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('ride-confirmed-for-captain', (data) => {
        console.log("Server confirmed the ride acceptance", data);
        // You can use this to update the ride state with OTP if needed
        // setRide(prevRide => ({...prevRide, ...data})); 
    });

    return () => socket.off('ride-confirmed-for-captain');
  }, [socket]);

    const confirmRide = async () => {
    if (!ride?._id) return; // Add a check for the ride ID

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
          rideId:ride._id,

          },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride confirmed:", response.data);
      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("new-ride", (data) => {
      console.log("🚗 New ride received:", data);
      setRide(data);
      setRidePopUpPanel(true);
    });

    return () => {
      socket.off("new-ride"); // ✅ clean up listener
    };
  }, [socket]);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { y: 0 });
    } else {
      gsap.to(ridePopUpPanelRef.current, { y: "100%" });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, { y: 0 });
    } else {
      gsap.to(confirmRidePopUpRef.current, { y: "100%" });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div>
      <div className="h-screen">
        {/* Header */}
        <div>
          <img
            className="w-16 absolute left-5 top-5 scale-[1.8] m-7"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
          <Link
            to="/home"
            className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>

        {/* Map Loading Section */}
        <div className="h-4/6 relative z-[-1]">
        <LiveTracking/>
        </div>

        {/* Details Section */}
        <div className="h-2/6 p-6">
          <CaptainDetails />
        </div>

        {/* Ride Popup */}
        <div
          ref={ridePopUpPanelRef}
          className="fixed bottom-0 z-10 w-full translate-y-full bg-white px-3 py-12"
        >
          <RidePopUp
            ride={ride}
            confirmRide={confirmRide}
            acceptRide={handleAcceptRide} 
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          />
        </div>

        {/* Confirm Ride Popup */}
        <div
          ref={confirmRidePopUpRef}
          className="fixed bottom-0 h-screen z-10 w-full translate-y-full bg-white px-3 py-12"
        >
          <ConfirmRidePopUp
          ride={ride}
            confirmRide={confirmRide}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;