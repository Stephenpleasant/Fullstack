import dotenv from 'dotenv';
dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);


import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // ✅ Import your DB connection logic

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
 
// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});