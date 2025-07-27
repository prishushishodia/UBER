const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      // ✅ This logic is correct, no changes needed
      if (userType === "user") {
        await userModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
      }
    });

    // ✅ REPLACED and FIXED the location update logic
    // We only need one listener for the captain's location update.
    socket.on("update-location-captain", async (data) => {
      // ✅ Destructure lng and ltd directly from the data payload
      const { userId, lng, ltd } = data;

      if (!userId || !lng || !ltd) {
        return console.log("Invalid location data received:", data);
      }

      try {
        // ✅ Update the database using the correct GeoJSON format
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [lng, ltd], // Correct format: [longitude, latitude]
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(`Sending message to socket ID:${socketId}`, messageObject);
  
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io is not initialized.");
  }
}

// ✅ CORRECTED MODULE EXPORTS
// You need to export both functions so they can be used in other files.
module.exports = { initializeSocket, sendMessageToSocketId };