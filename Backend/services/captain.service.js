const captainModel = require("../models/captain.model");

module.exports.createCaptiain = async ({
  firstname,
  lastname,
  email,
  password,
  colour,
  plate,
  capacity,
  vehicleType
}) => {
 if (!firstname || !email || !password || !colour || !plate || !capacity || !vehicleType) {
    throw new Error("all fields are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      colour,
      plate,
      capacity,
      vehicleType
    },
  });
  return captain;
};
