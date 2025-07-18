const mongoose = require('mongoose');

function connectToDb() {
    console.log("📡 Attempting MongoDB connection...");

    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection FAILED:", err.message);

    });
}

module.exports = connectToDb;
