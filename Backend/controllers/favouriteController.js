import express from 'express';
import { addFavorite, getFavorites } from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addFavorite); // Save a favorite movie
router.get('/', protect, getFavorites); // Get user's favorites

export default router;
// router.get('/:id', protect, getFavorite); // Get a specific favorite movie
// router.delete('/:id', protect, removeFavorite); // Remove a favorite movie