import dotenv from "dotenv";
dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // ✅ Import your DB connection logic

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware - UPDATE WITH CORRECT FRONTEND URL
app.use(cors({
  origin: [
    'https://fullstack-zhg6.vercel.app',  // ✅ Updated to match your current frontend URL
    'https://fullstack-8wys.vercel.app',  // Keep the old one just in case
    'http://localhost:3000',              // For local development
    'http://localhost:3001'               // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ JSON Middleware - ADD THIS LINE
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});