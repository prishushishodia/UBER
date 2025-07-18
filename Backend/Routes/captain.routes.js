const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware= require('../middlewares/auth.middleware')

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 8 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("vehicle number plate must at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("vehicle capacity must be at least 1"),
    body("vehicle.vehicleType")
      .toLowerCase()
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("inalid vehicle type"),
  ],
  captainController.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 8 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
