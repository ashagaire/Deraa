import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import ListingCard from './ListingCard';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/apartments", {
          headers: {
            // Add only necessary headers
            "Content-Type": "application/json",
          },
        });
        setApartments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div>
      {/* <!-- Listings Section --> */}
      <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-800">Featured Listings</h2>
      <div className="grid grid-rows-1 gap-6 mt-6">
      {apartments.map((ap) => (
          <ListingCard id={ap.apartment_id} discription={ap.description} address={ap.address} size={ap.size} rooms={ap.number_of_rooms} rent={ap.rent}/>
          
        ))}
      
      </div>
    </section>
      
    </div>
  );
};

export default ApartmentList;
