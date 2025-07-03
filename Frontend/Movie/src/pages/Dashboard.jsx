import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Initial fetch on component mount
  useEffect(() => {
    if (token) {
      fetchMovies("popular", 1); // Default search
    }
  }, [token]);

  const fetchMovies = async (searchTerm = "popular", pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
         `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&page=${pageNum}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(query, 1);
    } else {
      fetchPopularMovies(newPage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchMovies(query || "Avengers", newPage);
    }
  };

  if (!token) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        padding: '20px' 
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Access Denied</h2>
          <p style={{ marginBottom: '32px', color: '#9ca3af', fontSize: '18px' }}>You must be logged in to view the dashboard.</p>
          <button
            onClick={() => navigate("/auth")}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#1e293b', 
        borderBottom: '1px solid #374151', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10 
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>🎬 Movie Dashboard</h1>
            {user && <p style={{ fontSize: '14px', color: '#9ca3af', margin: '4px 0 0 0' }}>Welcome back, {user.name}!</p>}
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Search Section */}
          <div style={{ marginBottom: '48px' }}>
            <form
              onSubmit={handleSearch}
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '12px',
                maxWidth: '600px',
                margin: '0 auto',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                style={{
                  flex: '1',
                  minWidth: '300px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#374151',
                  color: 'white',
                  border: '1px solid #4b5563',
                  fontSize: '16px'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Search Movies
              </button>
            </form>
          </div>

          {/* Content Section */}
          {loading ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '80px 0' 
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                border: '4px solid #374151', 
                borderTop: '4px solid #2563eb', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                marginBottom: '16px'
              }}></div>
              <p style={{ color: '#9ca3af', fontSize: '18px' }}>Loading movies...</p>
            </div>
          ) : movies.length > 0 ? (
            <div>
              {/* Movies Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                {movies.map((movie, index) => (
                  <div
                    key={movie.id}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    style={{
                      backgroundColor: '#374151',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div style={{ position: 'relative', paddingBottom: '150%', overflow: 'hidden' }}>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                            : "https://via.placeholder.com/342x513/374151/9CA3AF?text=No+Image"
                        }
                        alt={movie.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h3 style={{ 
                        fontWeight: '600', 
                        color: 'white', 
                        marginBottom: '8px', 
                        fontSize: '14px',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {movie.title}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                        {movie.vote_average > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: '#fbbf24', fontSize: '12px' }}>⭐</span>
                            <span style={{ fontSize: '12px', color: '#d1d5db' }}>
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '16px', 
                  padding: '32px 0' 
                }}>
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: page === 1 ? 'not-allowed' : 'pointer',
                      opacity: page === 1 ? 0.5 : 1
                    }}
                  >
                    ← Previous
                  </button>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px' }}>
                    <span style={{ color: '#9ca3af' }}>Page</span>
                    <span style={{ fontWeight: '600', color: 'white' }}>{page}</span>
                    <span style={{ color: '#9ca3af' }}>of</span>
                    <span style={{ fontWeight: '600', color: 'white' }}>{totalPages}</span>
                  </div>
                  
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: page === totalPages ? 'not-allowed' : 'pointer',
                      opacity: page === totalPages ? 0.5 : 1
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '80px 0' 
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎬</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>No movies found</h3>
              <p style={{ color: '#6b7280', textAlign: 'center', maxWidth: '400px' }}>
                Try searching for different keywords or check your spelling.
              </p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;