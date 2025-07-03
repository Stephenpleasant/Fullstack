import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) fetchMovies();
  };

  const saveToFavorites = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save favorites.');
      return;
    }

    try {
      const res = await fetch('https://fullstack-3-jwvw.onrender.com/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Saved "${movie.title}" to favorites!`);
      } else {
        alert(data.message || 'Could not save movie.');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border rounded px-4 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 w-full"
              />
            )}
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-600">{movie.overview?.substring(0, 150)}...</p>
            <button
              onClick={() => saveToFavorites(movie)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Save to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;