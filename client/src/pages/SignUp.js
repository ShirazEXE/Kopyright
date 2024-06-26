import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages_styles/SignUp.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // new field
  const [role, setRole] = useState('Artist');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setMessage('Please check the Terms & Conditions of our service before Signing Up');
      return;
    }

    if (password!== confirmPassword) {
      setMessage('Passwords don\'t match');
      return;
    }

    try {
      await axios.post('/api/signup', {
        email,
        mobileNumber,
        username,
        password,
        role,
      });

      setMessage('Sign up successful. Please log in.');
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message.includes('Password not strong enough')) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            pattern="\d*"
            required
          />
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
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Retype Password"
            required
          />
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
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
              I hereby acknowledge that I have read, understood, and agree to the&nbsp;
              <Link
                to="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="terms-link"
              >
                Terms&Conditions
              </Link> 
              &nbsp;of the services.
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <p>{message}</p>
        <p>
          Already have an account?&nbsp;
          <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;