import React, { useEffect, useState, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = memo(() => {
  const { token } = useParams(); // Extract token from the URL
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState(null); // To track status code
  const [hasVerified, setHasVerified] = useState(false); // Flag to check if already verified

  console.log("EmailVerification render");

  useEffect(() => {
    console.log('Component mounted or token changed');
    console.log('hasVerified:', hasVerified);
    const verifyEmail = async () => {
      if (hasVerified) return; // Skip if already verified
      setHasVerified(true); // Set flag to prevent future calls
      console.log("Calling verifyEmail");
      try {
        const response = await axios.get(`http://localhost:5000/auth/verify-email/${token}`);
        setMessage(response.data);
        setStatusCode(response.status); // Store the status code
        console.log( message, statusCode );
      } catch (error) {
        if (error.response) {
            // Error response from the server
            setMessage(error.response.data); // Error message from the server
            setStatusCode(error.response.status); // Status code from the server
            console.log( message, statusCode );
        } else {
          // Network error or other issues
          setMessage('An error occurred during email verification.');
          setStatusCode(500); // General error status
          console.log(message, statusCode );
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
          <Link to="/registration">
            <button>Register Again</button>
          </Link>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </div>
      )}
    </div>
  );
});

export default EmailVerification;
