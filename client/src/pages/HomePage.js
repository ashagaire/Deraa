import React, { useState, Fragment, useEffect } from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";
import { useAuth } from "../AuthProvider";
import axios from "axios";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      // Check if the token exists in localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token is found, set isAuthenticated to false and return
        console.log("Please log in");
        return;
      }
      const response = await axios.get("http://localhost:5000/dashboard/", {
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = response.data;
      setName(parseRes.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className=" mx-auto">
      <Fragment>{isAuthenticated && <h1>{name}</h1>}</Fragment>
      <ApartmentSearch />
    </div>
  );
};

export default HomePage;
