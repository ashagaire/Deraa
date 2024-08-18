import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { token } = useParams(); // Extract token from the URL
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState(null); // To track status code

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/verify-email/${token}`);
        setMessage(response.data);
        setStatusCode(response.status); // Store the status code
      } catch (error) {
        if (error.response) {
            // Error response from the server
            setMessage(error.response.data); // Error message from the server
            setStatusCode(error.response.status); // Status code from the server
        } else {
          // Network error or other issues
          setMessage('An error occurred during email verification.');
          setStatusCode(500); // General error status
        }
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {statusCode === 200 ? (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/register">
            <button>Register Again</button>
          </Link>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
