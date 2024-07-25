import React, { useState } from "react";
import axios from "axios";

const AddApartment = () => {
  const [form, setForm] = useState({
    landlord_id: "",
    number_of_rooms: "",
    size: "",
    kitchen_included: false,
    bathroom_type: "",
    rent: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create form data to submit
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      
      const response = await axios.post("http://localhost:5000/apartments", form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      // window.location = "/";
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 m-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Add New Property
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="landlord_id"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            type="text"
            name="landlord_id"
            value={form.landlord_id}
            onChange={handleChange}
            placeholder="Landlord ID"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-5  border  p-2">
          <div className="  text-gray-800    p-">
            {/* Panel heading content */}
            Location
          </div>

          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-base">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div> */}
          </div>
        </div>

        <div className="mt-5  border  p-2">
          <div className="  text-gray-800    p-4">
            {/* Panel heading content */}
            Property Details
          </div>
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-base">
            <div>
              <label
                htmlFor="number_of_rooms"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Rooms
              </label>
              <input
                type="number"
                name="number_of_rooms"
                value={form.number_of_rooms}
                onChange={handleChange}
                placeholder="Number of Rooms"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Area
              </label>
              <input
                type="number"
                name="size"
                value={form.size}
                onChange={handleChange}
                placeholder="Size"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="bathroom_type"
                className="block text-sm font-medium text-gray-700"
              >
                Bathroom Type
              </label>
              <select
                name="bathroom_type"
                id="bathroom_type"
                value={form.bathroom_type}
                onChange={handleChange}
                className="form-input w-50"
              >
                <option value="">Select...</option>
                <option value="private">Private</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="kitchen_included"
                className="mr-2 block text-sm font-medium text-gray-700"
              >
                Kitchen Included
              </label>
              <input
                type="checkbox"
                name="kitchen_included"
                checked={form.kitchen_included}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="rent"
                className="block text-sm font-medium text-gray-700"
              >
                Rent
              </label>
              <input
                type="number"
                name="rent"
                value={form.rent}
                onChange={handleChange}
                placeholder="Rent"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* <div>
          <label htmlFor="pictures" className="block text-sm font-medium text-gray-700">Upload Pictures</label>
          <input type="file" name="pictures" onChange={handleChange} multiple className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div> */}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {/* {form.pictures.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Uploaded Pictures</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {form.pictures.map((picture, index) => (
              <div key={index} className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden">
                <div className="p-2">
                  <p className="text-sm text-gray-700 mb-2">{picture.name}</p>
                  <img src={URL.createObjectURL(picture)} alt={`Uploaded ${index + 1}`} className="object-cover h-24 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AddApartment;
