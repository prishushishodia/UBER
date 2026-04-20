import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user?._id]);

  useEffect(() => {
    socket.on("ride-started", (ride) => {
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride } });
    });
    return () => socket.off("ride-started");
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleRideConfirmed = (rideData) => {
      setRide(rideData);
      setVehicleFound(false);
      setWaitingForDriver(true);
    };
    socket.on("ride-confirmed", handleRideConfirmed);
    return () => socket.off("ride-confirmed", handleRideConfirmed);
  }, [socket]);

  const fetchSuggestions = async (value, field) => {
    if (!value.trim()) {
      field === "pickup" ? setPickupSuggestions([]) : setDestinationSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      field === "pickup"
        ? setPickupSuggestions(response.data)
        : setDestinationSuggestions(response.data);
    } catch {
      // silent fail
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
      setPickupSuggestions([]);
      setActiveField("destination");
    } else {
      setDestination(suggestion);
      setDestinationSuggestions([]);
      setActiveField(null);
    }
  };

  async function findTrip() {
    if (!pickup || !destination) {
      return alert("Please enter both pickup and destination.");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFare(response.data);
      setVehiclePanel(true);
    } catch (err) {
      console.error("fare error", err);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRide(response.data);
      setConfirmRidePanel(false);
      setVehicleFound(true);
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
    }
  }

  // Init all panels hidden
  useEffect(() => {
    gsap.set(vehiclePanelRef.current, { y: "100%" });
    gsap.set(confirmRidePanelRef.current, { y: "100%" });
    gsap.set(vehicleFoundRef.current, { y: "100%" });
    gsap.set(waitingForDriverRef.current, { y: "100%" });
  }, []);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, { y: vehiclePanel ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { y: confirmRidePanel ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { y: vehicleFound ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { y: waitingForDriver ? "0%" : "100%", duration: 0.4, ease: "power2.out" });
  }, [waitingForDriver]);

  const suggestions =
    activeField === "pickup" ? pickupSuggestions : destinationSuggestions;
  const showSuggestions = activeField !== null && suggestions.length > 0;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#F6F6F6]">
      {/* Logo */}
      <img
        className="w-14 absolute left-4 top-4 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      {/* Logout */}
      <button
        onClick={async () => {
          try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
          } finally {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }}
        className="absolute right-4 top-4 z-20 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
      >
        <i className="ri-logout-box-r-line text-[#111]" />
      </button>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Bottom booking card */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-white rounded-t-3xl shadow-2xl">
          {/* Drag pill */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>

          <div className="px-5 pt-2 pb-5">
            {/* Header */}
            <h2 className="text-xl font-bold text-[#111] mb-4">
              {activeField ? "Search location" : "Where to?"}
            </h2>

            {/* Inputs with vertical connector */}
            <div className="flex items-stretch gap-3 mb-3">
              {/* Connector dots + line */}
              <div className="flex flex-col items-center py-3 gap-0 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-black" />
                <div className="flex-1 w-px bg-gray-300 my-1" style={{ minHeight: 20 }} />
                <div className="w-3 h-3 rounded-full border-2 border-[#00C853] bg-[#00C853]" />
              </div>

              {/* Input fields */}
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  value={pickup}
                  placeholder="Add a pickup location"
                  onChange={(e) => {
                    setPickup(e.target.value);
                    fetchSuggestions(e.target.value, "pickup");
                  }}
                  onFocus={() => setActiveField("pickup")}
                  className="w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <input
                  type="text"
                  value={destination}
                  placeholder="Enter your destination"
                  onChange={(e) => {
                    setDestination(e.target.value);
                    fetchSuggestions(e.target.value, "destination");
                  }}
                  onFocus={() => setActiveField("destination")}
                  className="w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
            </div>

            {/* Suggestions — inline below inputs */}
            {showSuggestions && (
              <div className="max-h-52 overflow-y-auto border-t border-gray-100 mt-1 mb-2">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="flex items-center gap-3 px-1 py-3 border-b border-gray-50 active:bg-gray-50 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F6F6F6] flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-[#111] text-sm" />
                    </div>
                    <p className="text-sm text-[#111] font-medium leading-snug">{s}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Find Trip button — show when not actively searching */}
            {!activeField && (
              <button
                onClick={findTrip}
                className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-sm tracking-wide mt-1 active:scale-95 transition-transform"
              >
                Find Trip
              </button>
            )}

            {/* Dismiss suggestions button */}
            {activeField && (
              <button
                onClick={() => {
                  setActiveField(null);
                  setPickupSuggestions([]);
                  setDestinationSuggestions([]);
                }}
                className="w-full text-sm text-[#6B7280] py-2 mt-1 active:text-black transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slide-up panels */}
      <div ref={vehiclePanelRef} className="fixed bottom-0 left-0 right-0 z-50">
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 left-0 right-0 z-50">
        <ConfirmRide
          vehicleType={vehicleType}
          setVehiclePanel={setVehiclePanel}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div ref={vehicleFoundRef} className="fixed bottom-0 left-0 right-0 z-50">
        <LookingForDriver ride={ride} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className="fixed bottom-0 left-0 right-0 z-50">
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
