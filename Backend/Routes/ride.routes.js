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

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  rideController.confirmRide
);

router.get('/start-ride',
  authMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('invalid ride id'),
  query('otp').isString().isLength({min:6}).withMessage('invalid otp'),
  rideController.startRide
)

router.post('/end-ride',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('invalid ride id'),
  rideController.endRide
)

module.exports = router;
