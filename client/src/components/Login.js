import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setAuth } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const validateEmail = (email) => {
    // Simple email regex for validation
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(user.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!user.password) {
      newErrors.password = "Password is required";
    }

    user.errors = newErrors;

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If form is valid, proceed with form submission
      const { email, password } = user;
      const users = { email, password };

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          users,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const parseRes = response.data;
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setAuth(true);

          toast.success("Login successfull");
        } 
        
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
        Login
      </h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <Link to="/registration">Register </Link>
      <Link to="/forgot-password">Forgot Password </Link>
    </div>
  );
};

export default Login;
