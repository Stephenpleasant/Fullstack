import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("DB.js Mongo URI:", uri);

  if (!uri) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
// user is authenticated and redirects accordingly.
//       <div style={{ color: 'red', textAlign: 'center' }}>{error
