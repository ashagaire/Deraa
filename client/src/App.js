import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import Header from './components/Header';
import AddApartment from './components/AddApartment';
import ApartmentList from './components/ApartmentList';
import ApartmentSearch from './components/ApartmentSearch';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchWithNavigation />} />
        <Route path="/upload" element={<AddApartment />} />
        <Route path="/listings" element={<ApartmentList />} />
      </Routes>
    </Router>
  );
}

// A wrapper component to handle navigation after search
const SearchWithNavigation = () => {
  const navigate = useNavigate();

  // Function to handle search and navigate to Listings page
  const handleSearch = () => {
    navigate('/listings'); // Navigate to the Listings component
  };

  return <ApartmentSearch onSearch={handleSearch} />;
};
export default App;
