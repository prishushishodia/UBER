const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // You can replace this with your frontend origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findOneAndUpdate(
          { _id: userId },
          { socketId: socket.id }
        );
      } else if (userType === "captain") {
        await captainModel.findOneAndUpdate(
          { _id: userId },
          { socketId: socket.id }
        );
      }
    });

    socket.on("update-location", async (data) => {
      const { userId, userType, location } = data;

      console.log(`user ${userId} updated location to ${location}`);

      if (userType === "captain") {
        await captainModel.findOneAndUpdate(userId, { location });
      } else if (userType === "user") {
        await userModel.findOneAndUpdate(userId, { location });
      }
    });

    socket.on("update-location-captain", async (data) => {

      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findOneAndUpdate(userId,
        { location: { ltd: location.ltd, lng: location.lng } }
      );
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

module.exports = initializeSocket;
