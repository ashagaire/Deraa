import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to update authentication status
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //Function to check authorization token
  const isAuth = async () => {
    try {
      
      // Check if the token exists in localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        // If no token is found, set isAuthenticated to false and return
        setIsAuthenticated(false);
        console.log("Please log in");
        return;
      }
      const response = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = response.data;
      setIsAuthenticated(parseRes === true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
