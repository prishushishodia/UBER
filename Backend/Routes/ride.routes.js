const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");

const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("invalid vehicle Type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authMiddleware.authUser,
  rideController.getFare
);

module.exports = router;
