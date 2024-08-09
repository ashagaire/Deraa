// import React, { useState } from "react";
// import ApartmentSearch from '../components/ApartmentSearch';
// import ApartmentList from '../components/ApartmentList';
// import axios from 'axios';

// const SeachPage = () => {

//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (query) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/apartments/search?query=${query}`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   return (
//     <div>
//       <ApartmentSearch onSearch={handleSearch} />
//       <ApartmentList results={searchResults} />
//     </div>
//   );

//   };
  
//   export default SeachPage;