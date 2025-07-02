// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovie(response.data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-300 animate-pulse">
        Loading movie...
      </div>
    );

  if (!movie)
    return (
      <div className="text-center mt-10 text-red-400">Movie not found.</div>
    );

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white px-4 py-8 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        className="mb-6 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded w-full md:w-1/3 object-cover shadow-lg"
          whileHover={{ scale: 1.02 }}
        />

        <motion.div className="space-y-3">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">📅 Release Date: {movie.release_date}</p>
          <p className="text-sm text-gray-300">
            {movie.overview || "No description available."}
          </p>
          <p className="text-yellow-400 text-sm">⭐ Rating: {movie.vote_average}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MovieDetail;