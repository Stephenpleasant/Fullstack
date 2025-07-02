import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Auth from "./pages/Auth";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Protected Home Route */}
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/auth" replace />} />

      {/* Auth Route */}
      <Route path="/auth" element={<Auth />} />

      {/* Movie Details Route */}
      <Route path="/movie/:id" element={token ? <MovieDetail /> : <Navigate to="/auth" replace />} />

      {/* Fallback: Redirect unknown routes to auth or dashboard based on auth status */}
      <Route path="*" element={<Navigate to={token ? "/" : "/auth"} replace />} />
    </Routes>
  );
}

export default App;
