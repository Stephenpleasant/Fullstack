// routes/movieRoutes.js
import express from "express";
import axios from "axios";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Enhanced Movie Search Route
router.get("/search", authenticateUser, async (req, res) => {
  const { query, year, language, page = 1 } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: apiKey,
          query,
          year,
          language,
          page,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("TMDB API error:", error.message);
    res.status(500).json({ message: "Failed to fetch movies from TMDB" });
  }
});

export default router;