import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useAuth } from '../AuthProvider';
import axios from "axios";
import {toast} from 'react-toastify';

const Registration = () => {
  const { setAuth } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: false,
    errors: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple email regex for validation
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(user.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    }

    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    user.errors = newErrors;
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If form is valid, proceed with form submission
      const { username, email, password } = user;
      const users = { username, email, password };

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          users,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data)
        toast.success("Registration successfull");
        // const parseRes = response.data;
        // if (parseRes.token) {
        //   localStorage.setItem("token", parseRes.token);
        //   setAuth(true);
          
        //   toast.success("Registration successfull");
        // } 
        
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data
          : error.message;
        setAuth(false);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              user.errors.username ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            required
          />
          {user.errors.username && (
            <p className="text-red-500 text-sm mt-1">{user.errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              user.errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            required
          />
          {user.errors.email && (
            <p className="text-red-500 text-sm mt-1">{user.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              user.errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            required
          />
          {user.errors.password && (
            <p className="text-red-500 text-sm mt-1">{user.errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              user.errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            required
          />
          {user.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {user.errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
        <Link to="/login" >Login </Link>
      </form>
    </div>
  );
};

export default Registration;
