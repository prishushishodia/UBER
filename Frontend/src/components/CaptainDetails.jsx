import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  // Fallback for captain data if it's not fully loaded or available
  if (!captain || !captain.fullname) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading captain details...
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl"> {/* Added padding, shadow, and rounded corners */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300"> {/* Added bottom border for separation */}
        <div className="flex items-center gap-4"> {/* Increased gap for better spacing */}
          <img
            className="h-14 w-14 rounded-full object-cover border-2 border-yellow-500 p-0.5" // Larger image, border for emphasis
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${captain.fullname.firstname} ${captain.fullname.lastname}`} // Added dynamic alt text for accessibility
          />
          <h4 className="text-xl capitalize font-semibold text-gray-800"> {/* Larger font, bolder, darker text */}
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right"> {/* Aligned text to the right */}
          <h5 className="text-2xl font-bold text-yellow-600"> {/* Larger, bolder, and yellow for earnings */}
            ₹300
          </h5>
          <p className="text-sm text-gray-500 mt-1">Earned</p> {/* Slightly darker gray for clarity */}
        </div>
      </div>

      <div className="flex px-2 py-5 mt-6 bg-yellow-300 rounded-xl justify-around items-center"> {/* Changed background, added horizontal padding, used justify-around */}
        <div className="text-center flex-1"> {/* flex-1 to distribute space evenly */}
          <i className="text-4xl mb-2 ri-time-line text-black"></i> {/* Larger icon, yellow color */}
          <h5 className="text-xl font-bold text-gray-800">10.2</h5> {/* Larger and bolder text */}
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="text-center flex-1 border-x border-gray-200"> {/* Added vertical border between items */}
          <i className="text-4xl mb-2 ri-speed-up-line text-black"></i>
          <h5 className="text-xl font-bold text-gray-800">10.2</h5>
          <p className="text-sm text-gray-500">Rides Completed</p> {/* Corrected text from "Hours Online" */}
        </div>
        <div className="text-center flex-1">
          <i className="text-4xl mb-2 ri-star-line text-black"></i> {/* Changed icon to star, assuming it's for ratings */}
          <h5 className="text-xl font-bold text-gray-800">4.8</h5> {/* Changed value assuming it's a rating */}
          <p className="text-sm text-gray-500">Rating</p> {/* Changed text to "Rating" */}
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;