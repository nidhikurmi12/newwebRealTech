import React from "react";
import Property1 from "./img/property1.jpeg";
import Property2 from "./img/property2.jpeg";
import Property3 from "./img/property3.jpeg";
import Property4 from "./img/property4.jpeg";
import Property5 from "./img/property5.jpeg";
import Property6 from "./img/property6.jpeg";
import Property7 from "./img/property7.jpeg";

const properties = [
  {
    id: 1,
    title: "Modern Family Home",
    price: "$850,000",
    type: "For Sale",
    image: Property1,
  },
  {
    id: 2,
    title: "Spacious Urban Apartment",
    price: "$2,000/month",
    type: "For Rent",
    image: Property2,
  },
  {
    id: 3,
    title: "Luxury Countryside Villa",
    price: "$1,200,000",
    type: "For Sale",
    image: Property3,
  },
  {
    id: 4,
    title: "Cozy Suburban House",
    price: "$1,500/month",
    type: "For Rent",
    image: Property4,
  },
  {
    id: 5,
    title: "Stylish City Loft",
    price: "$900,000",
    type: "For Sale",
    image: Property5,
  },
  {
    id: 6,
    title: "Elegant Beachside Bungalow",
    price: "$3,000/month",
    type: "For Rent",
    image: Property6,
  },
  {
    id: 7,
    title: "Charming Country Cottage",
    price: "$750,000",
    type: "For Sale",
    image: Property7,
  },
];

const Properties = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10 bg-gray-100">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ml-6 mb-8 text-gray-800">
        Find Your Dream Home: Buy or Rent with Real Trust
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-8 lg:px-12">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div
              className={`absolute top-0 left-0 w-full text-white text-xs md:text-sm font-bold uppercase py-1 md:py-2 px-2 md:px-4 text-center ${
                property.type === "For Sale" ? "bg-yellow-600" : "bg-yellow-700"
              }`}
            >
              {property.type}
            </div>
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 md:h-56 lg:h-64 object-cover"
            />
            <div className="p-3 md:p-4 pt-16">
              <h3 className="text-md md:text-lg lg:text-xl font-semibold mb-1 text-gray-800">
                {property.title}
              </h3>
              <p className="text-gray-700 mb-8">{property.price}</p>
            </div>
            <button className="absolute bottom-4  right-4 border border-yellow-600 text-yellow-600 py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-gray-100 focus:outline-none">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;