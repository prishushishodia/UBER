const axios = require("axios");
const captainModel = require("../models/captain.model");

// Photon (photon.komoot.io) — free, no key, OpenStreetMap-based, built for autocomplete
const photonGet = (url) => axios.get(url, { headers: { "User-Agent": "UberCloneApp/1.0" } });

function photonLabel(props) {
  return [props.name, props.street, props.city, props.state, props.country]
    .filter(Boolean)
    .join(", ");
}

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;
  const response = await photonGet(url);
  const features = response.data.features;
  if (!features || !features.length) throw new Error("Unable to fetch coordinates");
  const [lng, lat] = features[0].geometry.coordinates;
  return { ltd: lat, lng };
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) throw new Error("Origin and destination are required");

  const [originCoords, destCoords] = await Promise.all([
    module.exports.getAddressCoordinate(origin),
    module.exports.getAddressCoordinate(destination),
  ]);

  // OSRM public routing API — free, no key
  const url = `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;
  const response = await axios.get(url);

  if (!response.data.routes || !response.data.routes.length) throw new Error("No routes found");

  const route = response.data.routes[0];
  return {
    distance: { value: route.distance, text: `${(route.distance / 1000).toFixed(1)} km` },
    duration: { value: route.duration, text: `${Math.round(route.duration / 60)} mins` },
  };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) throw new Error("address query is required");

  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=6`;
  const response = await photonGet(url);

  if (!response.data.features || !response.data.features.length) return [];
  return response.data.features.map((f) => photonLabel(f.properties));
};

module.exports.getCaptainsInTheRadius = async (lng, ltd, radius) => {
  const captains = await captainModel.find({
    socketId: { $ne: null },
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6371],
      },
    },
  });
  return captains;
};
