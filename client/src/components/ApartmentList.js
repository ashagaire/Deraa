import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('/api/apartments',{
            headers: {
                // Add only necessary headers
                'Content-Type': 'application/json',
              }
        });
        setApartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div>
      {apartments.map((apartment) => (
        <div key={apartment.apartment_id}>
          <h2>{apartment.address}</h2>
          <p>{apartment.description}</p>
          {/* Display other apartment details */}
        </div>
      ))}
    </div>
  );
};

export default ApartmentList;
