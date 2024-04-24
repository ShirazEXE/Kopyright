import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages_styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Artist');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username,
        password,
        role,
      });

      if (response.data.role === 'Investor') {
        navigate('/InvestorDashboard');
      } else {
        navigate('/CreatorDashboard');
      }
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === 'We can\'t find your account. Please sign up.') {
        setMessage('We can\'t find your account. Please sign up.');
      } else if (error.response.status === 401 && error.response.data.message === 'Invalid username or password') {
        setMessage('Invalid username or password');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Artist">Artist</option>
            <option value="Investor">Investor</option>
          </select>
          <div className="form-group">
            <label htmlFor="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        {message && <p className="text-danger">{message}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;