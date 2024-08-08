import React from 'react';
import image1 from '../helper/image1.jpg'

const ListingCard = ({id, discription,address, size, rooms,rent}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center p-4">
    {/* Image on the left side */}
    <img src={image1} alt="Listing" className="w-1/3 h-48 object-cover rounded-l-lg" />
    
    {/* Center content: Address and Description */}
    <div className="flex-1 px-4">
      <h3 className="text-xl font-semibold text-gray-800">{id}</h3>
      <p className="mt-2 text-gray-600">Address : {address}</p>
      <p className="mt-2 text-gray-600">Size: {size}</p>
      <p className="mt-2 text-gray-600">No Of Rooms: {rooms}</p>
      <p className="mt-2 text-gray-600">{discription}</p>
    </div>
    
    {/* Button on the right side */}
    <div className="w-1/4 ">
    <p className="mt-2 text-gray-600">{rent}</p>
      <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Details
      </a>
    </div>
  </div>
  );
};

export default ListingCard;