const dotenv = require("dotenv");
dotenv.config();

require('./models/user.model');
require('./models/captain.model');
require('./models/ride.model');
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");

const userRoutes = require("./Routes/user.routes");
const captainRoutes = require("./Routes/captain.routes");
const mapsRoutes = require("./Routes/maps.routes");
const rideRoutes= require('./Routes/ride.routes');

const connectToDb = require("./db/db");
connectToDb(); // 🔗 DB connects now

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
