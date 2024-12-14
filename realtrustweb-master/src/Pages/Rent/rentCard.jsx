import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaSquare } from "react-icons/fa"; // Importing icons
import { FaArrowRight } from "react-icons/fa6";
const placeholderImage = "https://via.placeholder.com/200";

const RentCard = ({ list }) => {
  return (
    <div className="lectures flex flex-wrap  gap-8 p-8 relative">
      {list.map((property) => (
        <div
          key={property.id}
          className="offline-classes border border-gray-200 rounded-lg w-[280px] h-auto flex flex-col justify-between cursor-pointer hover:shadow-lg transition duration-300"
        >
          <img
            src={property.gallery[0]?.image_url || placeholderImage}
            alt={property.title}
            className="fluid-img w-full h-[150px] object-cover rounded-t-lg"
            onError={(e) => (e.target.src = placeholderImage)}
          />
          <div className="information flex items-center justify-between p-4 pb-1 cursor-pointer">
            <div className="growth flex items-center gap-2.5">
              <p className="text-xs opacity-60">{property.type}</p>
            </div>
            <div className="rating flex items-center gap-1.5 border border-yellow-400 px-3 rounded">
              <span className="text-sm text-yellow-500">{property.purpose}</span>
            </div>
          </div>
          <div className="title px-4 ">
            <p className="text-lg font-semibold text-gray-800">
              {property.title}
            </p>
          </div>
          <div className="title px-4 py-2">
            <p
              className="text-gray-700 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: property.description }}
            ></p>
          </div>
          <div className="text-gray-600 px-4 pb-2">
            <p>
              Location:  
              <span className="font-semibold"> {property.city}</span>
            </p>
            <p className="mb-1">
              Price:{" "}
              <span className="font-semibold text-yellow-600">
                ₹{property.price}
              </span>
            </p>
            <p className="mb-1">
              Area: <span className="font-semibold">{property.area} sq ft</span>
            </p>
          </div>
          <div className="pricing-level px-4 pt-1 pb-3 bg-green-100 bg-opacity-10">
            <div className="flex gap-2">
              <div className="flex items-center bg-yellow-100 text-yellow-800 py-1 px-2 rounded border border-yellow-300">
                <FaBed className="mr-1" /> {/* Bedroom Icon */}
                {property.bedroom}
              </div>
              <div className="flex items-center bg-pink-100 text-pink-800 py-1 px-2 rounded border border-pink-300">
                <FaBath className="mr-1" /> {/* Bathroom Icon */}
                {property.bathroom}
              </div>
              <div className="flex items-center bg-indigo-100 text-indigo-800 py-1.5 px-3 rounded-lg border border-indigo-300">
                <FaSquare className="mr-1" /> {/* Area Icon */}
                {property.area}
              </div>
            </div>
          </div>
          <Link
            to={`/property/${property.unique_id}`}
            className="bg-yellow-500 flex justify-between text-white py-1 px-4 rounded-b-md hover:bg-yellow-600 transition mt-auto"
          >
            View Details <FaArrowRight size={20}/>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RentCard;
