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
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import Logo from "../components/Logo";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [formError, setFormError] = useState("");
  const [findingFare, setFindingFare] = useState(false);

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
      setFormError("Add both a pickup point and a destination first.");
      return;
    }
    setFormError("");
    setFindingFare(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFare(response.data);
      setVehiclePanel(true);
    } catch (err) {
      console.error("fare error", err);
      setFormError("Couldn't fetch fares for this route. Please try again.");
    } finally {
      setFindingFare(false);
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
    gsap.to(vehiclePanelRef.current, { y: vehiclePanel ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { y: confirmRidePanel ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { y: vehicleFound ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { y: waitingForDriver ? "0%" : "100%", duration: 0.45, ease: "power3.out" });
  }, [waitingForDriver]);

  const suggestions = activeField === "pickup" ? pickupSuggestions : destinationSuggestions;
  const showSuggestions = activeField !== null && suggestions.length > 0;
  const firstName = user?.fullname?.firstname;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-mist">
      {/* Top bar */}
      <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-4 pt-4">
        <div className="animate-fade-in rounded-2xl bg-white/90 px-3.5 py-2 shadow-lg shadow-ink/5 backdrop-blur-sm">
          <Logo size="sm" />
        </div>
        <button
          aria-label="Sign out"
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
          className="map-action animate-fade-in"
        >
          <i className="ri-logout-box-r-line" />
        </button>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Bottom booking sheet */}
      <div className="absolute right-0 bottom-0 left-0 z-30">
        <div className="sheet animate-fade-up">
          {/* Drag pill */}
          <div className="pt-3 pb-1">
            <div className="grab" />
          </div>

          <div className="px-5 pt-2 pb-6">
            {/* Header */}
            <div className="mb-4">
              {!activeField && firstName && (
                <p className="text-xs font-semibold tracking-wide text-fog">
                  Hey {firstName} 👋
                </p>
              )}
              <h2 className="mt-0.5 text-xl font-extrabold tracking-tight text-ink">
                {activeField ? "Search location" : "Where to?"}
              </h2>
            </div>

            {/* Inputs with route connector */}
            <div className="mb-3 flex items-stretch gap-3">
              {/* Connector: dot → dashed line → square */}
              <div className="flex flex-shrink-0 flex-col items-center py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-ink" />
                <span
                  className="my-1.5 w-px flex-1 border-l border-dashed border-fog/50"
                  style={{ minHeight: 24 }}
                />
                <span className="h-2.5 w-2.5 bg-go" />
              </div>

              {/* Input fields */}
              <div className="flex flex-1 flex-col gap-2">
                {["pickup", "destination"].map((field) => {
                  const value = field === "pickup" ? pickup : destination;
                  const setValue = field === "pickup" ? setPickup : setDestination;
                  const clear = () => {
                    setValue("");
                    field === "pickup" ? setPickupSuggestions([]) : setDestinationSuggestions([]);
                  };
                  return (
                    <div key={field} className="relative">
                      <input
                        type="text"
                        value={value}
                        placeholder={field === "pickup" ? "Add a pickup point" : "Where are you going?"}
                        onChange={(e) => {
                          setValue(e.target.value);
                          fetchSuggestions(e.target.value, field);
                        }}
                        onFocus={() => setActiveField(field)}
                        className={`w-full rounded-xl bg-mist py-3 pr-9 pl-4 text-sm font-medium text-ink transition outline-none placeholder:font-normal placeholder:text-fog/60 focus:ring-2 focus:ring-ink ${
                          activeField === field ? "ring-2 ring-ink" : ""
                        }`}
                      />
                      {value && (
                        <button
                          aria-label={`Clear ${field}`}
                          onClick={clear}
                          className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-full p-1 text-fog transition hover:text-ink"
                        >
                          <i className="ri-close-circle-fill text-base" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inline error */}
            {formError && !activeField && (
              <div className="animate-fade-in mb-3 flex items-start gap-2 rounded-xl border border-danger/20 bg-danger/5 px-3.5 py-2.5">
                <i className="ri-error-warning-line mt-0.5 text-sm text-danger" />
                <p className="text-xs font-medium text-danger">{formError}</p>
              </div>
            )}

            {/* Suggestions */}
            {showSuggestions && (
              <div className="mt-1 mb-2 max-h-52 overflow-y-auto border-t border-line">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="flex w-full cursor-pointer items-center gap-3 border-b border-line/60 px-1 py-3 text-left transition active:bg-mist"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-mist">
                      <i className="ri-map-pin-2-fill text-sm text-soot" />
                    </span>
                    <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{s}</p>
                    <i className="ri-arrow-left-up-line flex-shrink-0 text-sm text-fog/60" />
                  </button>
                ))}
              </div>
            )}

            {/* Primary action */}
            {!activeField ? (
              <button onClick={findTrip} disabled={findingFare} className="btn-ink mt-1">
                {findingFare ? (
                  <>
                    <span className="spinner" /> Getting fares…
                  </>
                ) : (
                  <>
                    Find a trip
                    <i className="ri-search-line text-base" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveField(null);
                  setPickupSuggestions([]);
                  setDestinationSuggestions([]);
                }}
                className="mt-1 w-full cursor-pointer py-2 text-sm font-semibold text-fog transition-colors active:text-ink"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slide-up panels */}
      <div ref={vehiclePanelRef} className="fixed right-0 bottom-0 left-0 z-50">
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed right-0 bottom-0 left-0 z-50">
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

      <div ref={vehicleFoundRef} className="fixed right-0 bottom-0 left-0 z-50">
        <LookingForDriver ride={ride} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className="fixed right-0 bottom-0 left-0 z-50">
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
