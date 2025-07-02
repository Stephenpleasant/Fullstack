import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Make sure this is the password you will use to log in

    const user = new User({
      name: "testuser",
      email: "test2@example.com",
      password: hashedPassword,
    });

    await user.save();
    console.log("✅ Test user created successfully!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Error creating user:", err));