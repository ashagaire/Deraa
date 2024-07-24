import React, { useState } from "react";
import "../style.css";

const ApartmentSearch = () => {
  const [search, setSearch] = useState({
    number_of_rooms: "",
    size: "",
    kitchen_included: false,
    bathroom_type: "",
    rent: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearch({
      ...search,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Search Property</h2>
      
      <div className="mt-5  border  p-4">
        
        <div className="  text-gray-800    p-1">
          {/* Panel heading content */}
          Location
        </div>
        <div className="panel-body max-w-[1200px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-base">
          <input
            type="text"
            name="address"
            id="address"
            value={search.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-input"
          />
          {/* <input
            type="text"
            name="address"
            id="address"
            value={search.address}
            onChange={handleChange}
            placeholder="District"
            className="form-input"
          />
          <input
            type="text"
            name="address"
            id="address"
            value={search.address}
            onChange={handleChange}
            placeholder="City"
            className="form-input"
          />
          <input
            type="text"
            name="address"
            id="address"
            value={search.address}
            onChange={handleChange}
            placeholder="Ward"
            className="form-input"
          />
          <input
            type="text"
            name="address"
            id="address"
            value={search.address}
            onChange={handleChange}
            placeholder="Street"
            className="form-input"
          /> */}
        </div>
        {/* Rest of the form fields */}
      </div>
      <div className="mt-5  border  p-4">
        <div className="  text-gray-800    p-1">
          {/* Panel heading content */}
          Details
        </div>
        <div className="panel-body max-w-[1200px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-base">
          <div className="form-group">
            <label htmlFor="number_of_rooms" className="form-label ">
              Number of Rooms
            </label>
            <input
              type="number"
              name="number_of_rooms"
              id="number_of_rooms"
              value={search.number_of_rooms}
              onChange={handleChange}
              placeholder="Number of Rooms"
              className="form-input w-50"
            />
          </div>

          <div className="form-group">
          <label htmlFor="bathroom_type" className="form-label">Bathroom Type</label>
          <select
            name="bathroom_type"
            id="bathroom_type"
            value={search.bathroom_type}
            onChange={handleChange}
            className="form-input w-50"
          >
            <option value="">Select...</option>
            <option value="private">Private</option>
            <option value="shared">Shared</option>
          </select>
        </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="kitchen_included"
              id="kitchen_included"
              checked={search.kitchen_included}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="kitchen_included" className="form-checkbox-label">
              Kitchen
            </label>
          </div>


          
        </div>
        {/* Rest of the form fields */}
      </div>
      <div className="form-group">
            <label htmlFor="rent_min" className="form-label">
              Rent
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="rent_min"
                id="rent_min"
                value={search.rent_min}
                onChange={handleChange}
                placeholder="Min"
                className="form-input w-24"
              />
              <span>-</span>
              <input
                type="number"
                name="rent_max"
                id="rent_max"
                value={search.rent_max}
                onChange={handleChange}
                placeholder="Max"
                className="form-input w-24"
              />
            </div>
          </div>

      <button type="submit" className="form-button">
        Search
      </button>
    </form>
  );
};

export default ApartmentSearch;
