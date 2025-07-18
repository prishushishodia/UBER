import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const CaptainRiding = (props) => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef= useRef(null);


  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0, // GSAP uses camelCase and shorthand for transforms
      });
    } else {
      gsap.to(finishRidePanelRef .current, {
        y: "100%", // translateY(100%)
      });
    }
  }, [finishRidePanel]);


  return (
    <div>
      <div className="h-screen">
        <div>
          {" "}
          <img
            className="w-16 absolute  left-5 top-5 scale-180 m-7"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to="/captain-home"
            className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className="h-4/5">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="load"
          />
        </div>
        <div 
     
        className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400">
         <h5 className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl text-gray-600 hover:text-black transition">
  <i className="ri-arrow-up-wide-line"></i>
</h5>

          <h3 className="text-xl font-semibold">4 Km away</h3>
          <button 
           onClick={() => {
        setFinishRidePanel(true);
          }}
          className=" bg-green-500  text-white font-semibold p-3 px-10 rounded-lg ">
            Complete Ride
          </button>
        </div>
      </div>
       <div
          ref={finishRidePanelRef}
          className="fixed bottom-0 h-screen z-10 w-full translate-y-full bg-white px-3 py-12"
        >
          <FinishRide setFinishRidePanel={setFinishRidePanel}/>
        </div>
    </div>
  );
};

export default CaptainRiding;
