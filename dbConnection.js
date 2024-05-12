const mongoose = require('mongoose');

require("dotenv").config();

let dbconnection = null

const connectDB = async () => {
    if (dbconnection) {
        // use cached connection when available
        return;
    }
    try {
        let dbUrl = process.env.MONGODB_URI;
        dbconnection = await mongoose.connect(dbUrl);
        console.log(`MongoDB connected: ${dbconnection.connection.host}`);

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = { connectDB, disconnectDB };
