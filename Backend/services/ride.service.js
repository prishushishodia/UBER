const { send } = require("process");
const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
}
module.exports.getFare = getFare;

function getOTP(num) {
  function generateOTP(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOTP(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) {
    throw new Error("rideId and captainId are required");
  }

  // Find the ride, update it, and return the new version in one step
  const ride = await rideModel.findByIdAndUpdate(
    rideId, // Use the ID directly
    {
      status: "accepted",
      captain: captainId, // Use the captainId passed into the function
    },
    { new: true } // This option tells Mongoose to return the updated document
  ).populate("user").populate("captain").select("+otp"); // Populate user and captain details

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error('Ride ID and OTP are required');
  }

  const ride = await rideModel.findOne({ _id: rideId })
    .populate('user')
    .populate('captain')
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.status !== 'accepted') {
    throw new Error('Ride not accepted');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: 'ongoing' }
  );
  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-started',
    data: ride
  }
  )
  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride ID is required');
  }

  const ride = await rideModel.findOne({ _id: rideId, captain: captain._id })
    .populate('user')
    .populate('captain')
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
    throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: 'completed' }
  );
return ride;


}