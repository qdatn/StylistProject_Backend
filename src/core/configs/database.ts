import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const ConnectDB = async () => {
  const MONGO_PATH: string = process.env.MONGO_URI || "";

  try {
    const conn = await mongoose.connect(MONGO_PATH);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit on failure
  }
};

export default ConnectDB;
