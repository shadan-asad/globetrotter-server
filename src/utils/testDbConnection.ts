import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db";
import Destination from "../models/destination.model";
import User from "../models/user.model";
import Challenge from "../models/challenge.model";

dotenv.config();

const testConnection = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Connected to MongoDB successfully!");

    // Test Destination model
    console.log("Testing Destination model...");
    const destinationCount = await Destination.countDocuments();
    console.log(`Destinations in database: ${destinationCount}`);

    // Test User model
    console.log("Testing User model...");
    const userCount = await User.countDocuments();
    console.log(`Users in database: ${userCount}`);

    // Test Challenge model
    console.log("Testing Challenge model...");
    const challengeCount = await Challenge.countDocuments();
    console.log(`Challenges in database: ${challengeCount}`);

    console.log("All models verified successfully!");

    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error testing database connection:", error);
    process.exit(1);
  }
};

testConnection();
