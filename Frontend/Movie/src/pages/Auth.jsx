import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const posters = [
  'https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
  'https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg',
  'https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
  'https://image.tmdb.org/t/p/original/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg',
];

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosterIndex((prev) => (prev + 1) % posters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleAuthMode = () => {
    setIsRegister((prev) => !prev);
    setError('');
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Debug: Log the API URL being used
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://fullstack-3-jwvw.onrender.com';
    console.log('API Base URL:', baseUrl);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister
      ? formData
      : { email: formData.email, password: formData.password };

    console.log('Making request to:', `${baseUrl}${endpoint}`);
    console.log('Payload:', payload);

    try {
      const res = await axios.post(`${baseUrl}${endpoint}`, payload);
      console.log('Response:', res.data);

      if (!isRegister) {
        // Store user data
        localStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
          })
        );
        
        // Debug: Verify data was stored
        console.log('Token stored:', localStorage.getItem('token'));
        console.log('User stored:', localStorage.getItem('user'));
        
        alert('Login successful!');
        
        // Navigate to dashboard
        console.log('Navigating to dashboard...');
        navigate('/dashboard');
        
        // Alternative navigation (if above doesn't work)
        // window.location.href = '/dashboard';
        
      } else {
        alert(res.data.message || 'User registered successfully');
        setIsRegister(false);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      console.error('Request failed:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background with rotating posters */}
      <div
        className="auth-background"
        style={{
          backgroundImage: `url(${posters[posterIndex]})`,
        }}
      />
      <div className="auth-overlay" />
      
      {/* Auth Card */}
      <div className="auth-card">
        <h1 className="auth-title">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        <p className="auth-subtitle">
          {isRegister 
            ? 'Join us to discover amazing movies' 
            : 'Sign in to continue your movie journey'
          }
        </p>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
                disabled={isLoading}
                autoComplete="name"
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
                disabled={isLoading}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="password-toggle"
                title={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="auth-toggle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleAuthMode}
            className="auth-toggle-button"
            disabled={isLoading}
          >
            {isRegister ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;