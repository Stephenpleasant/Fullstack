import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Auth from "./pages/Auth";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Listen for storage changes to update token state
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for storage events (for cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    // Also check localStorage periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (currentToken !== token) {
        setToken(currentToken);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  return (
    <Routes>
      {/* Protected Home Route */}
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/auth" replace />} />

      {/* Auth Route */}
      <Route path="/auth" element={!token ? <Auth /> : <Navigate to="/" replace />} />

      {/* Movie Details Route */}
      <Route path="/movie/:id" element={token ? <MovieDetail /> : <Navigate to="/auth" replace />} />

      {/* Fallback: Redirect unknown routes to auth or dashboard based on auth status */}
      <Route path="*" element={<Navigate to={token ? "/" : "/auth"} replace />} />
    </Routes>
  );
}

export default App;