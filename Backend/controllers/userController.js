// controllers/userController.js
import User from "../models/User.js";

// Add a movie to favorites
export const addFavorite = async (req, res) => {
  const userId = req.user._id;
  const { movieId, title, poster_path, release_date } = req.body;

  try {
    const user = await User.findById(userId);

    const alreadySaved = user.favorites.some((movie) => movie.movieId === movieId);
    if (alreadySaved) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    user.favorites.push({ movieId, title, poster_path, release_date });
    await user.save();

    res.status(201).json({ message: "Movie added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to add favorite", error: err.message });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve favorites", error: err.message });
  }
};

// Remove a favorite movie
export const removeFavorite = async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter((movie) => movie.movieId !== movieId);
    await user.save();

    res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove favorite", error: err.message });
  }
};
// Update user profile
export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { username, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};