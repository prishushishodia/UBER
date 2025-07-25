import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";





const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
    const confirmRidePopUpRef = useRef(null);

// CaptainHome.jsx

const { socket } = useContext(SocketContext); // ✅ Correct: Destructure the socket
const { captain } = useContext(CaptainDataContext);

   
    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                  // console.log({
                  //       userId: captain._id,
                  //       ltd: position.coords.latitude,
                  //       lng: position.coords.longitude
                  //   });
                  

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])
socket.on('new-ride',(data)=>{
  console.log(data);

  
})


  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        y: 0, // GSAP uses camelCase and shorthand for transforms
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        y: "100%", // translateY(100%)
      });
    }
  }, [ridePopUpPanel]);


  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, {
        y: 0, // GSAP uses camelCase and shorthand for transforms
      });
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        y: "100%", // translateY(100%)
      });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div>
      <div className="h-screen">
        <div>
          {" "}
          <img
            className="w-16 absolute  left-5 top-5 scale-[1.8] m-7"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to="/home"
            className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className="h-4/6">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="load"
          />
        </div>
        <div className="h-2/6 p-6">
          <CaptainDetails />
        </div>
        <div
          ref={ridePopUpPanelRef}
          className="fixed bottom-0  z-10 w-full translate-y-full bg-white px-3 py-12"
        >
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>
         <div
          ref={confirmRidePopUpRef}
          className="fixed bottom-0 h-screen z-10 w-full translate-y-full bg-white px-3 py-12"
        >
          <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
