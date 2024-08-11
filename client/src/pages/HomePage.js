import React, { useState, Fragment } from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";

const HomePage = () => {
  return (
    <div className=" mx-auto">
      <ApartmentSearch />
    </div>
  );
};

export default HomePage;
