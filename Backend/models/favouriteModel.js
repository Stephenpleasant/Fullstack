import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: String,
    overview: String,
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
// Export the Favorite model for use in other parts of the application
// This model defines the structure for favorite movies in the database