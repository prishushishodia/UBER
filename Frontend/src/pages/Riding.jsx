import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
         <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1568137223448-0708e0e4779c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="load"
        />
      </div>
      <div className="h-1/2 p-4">
      
        <div className="w-full mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm">
          {/* Pickup */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-blue-600 ri-map-pin-fill"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                562/11-V
              </h3>
              <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-green-600 ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Destination
              </h3>
              <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4 p-4">
            <i className="text-xl text-yellow-600 ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">₹99</h3>
              <p className="text-sm text-gray-500">Ride Fare</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a payment</button>
      </div>
    </div>
  );
};

export default Riding;
