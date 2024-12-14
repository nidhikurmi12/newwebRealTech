import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const placeholderImage = "https://via.placeholder.com/200";

const Sale = ({ list = [] }) => {
  return (
    <div className="w-full lg:px-6 lg:py-1 pl-[4x] pr-[4px] mt-1 md:mt-7">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Property Listings for Sale
      </h1>
      <div className="space-y-8">
        {list.length > 0 ? (
          list.map((property) => (
            <div
              key={property.id}
              className="border rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 bg-gradient-to-r from-white to-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-4 lg:p-6 p-3">
                <div className="w-full lg:w-[270px] md:w-1/3 h-auto object-cover rounded-lg">
                  <Slide>
                    {property.gallery && property.gallery.length > 0 ? (
                      property.gallery.map((image, index) => (
                        <div className="each-slide" key={index}>
                          <img
                            src={image.image_url || placeholderImage}
                            alt={property.title}
                            className="w-full h-52 p-1 object-cover rounded-lg"
                            onError={(e) => (e.target.src = placeholderImage)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="each-slide">
                        <img
                          src={placeholderImage}
                          alt="Placeholder"
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </Slide>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {property.title}
                    </h2>
                    <p
                      className="text-gray-700 mb-2 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: property.description }}
                    ></p>
                    <p className="text-gray-600 mb-1">
                      Price:{" "}
                      <span className="font-semibold text-yellow-700">
                        ₹{property.price}
                      </span>
                    </p>
                    <p className="text-gray-600 mb-1">
                      Location:{" "}
                      <span className="font-semibold text-gray-800">
                        {property.city.city_name}
                      </span>
                    </p>
                    <p className="text-gray-600 mb-1">
                      Type:{" "}
                      <span className="font-semibold text-gray-800 capitalize">
                        {property.type}
                      </span>
                    </p>
                    <p
                      className={`text-gray-600 font-semibold ${
                        property.purpose === "sale"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      Status: {property.purpose}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between flex-wrap gap-2 items-center p-3 bg-white rounded-b-xl border-t border-gray-200">
                <div className="flex flex-wrap gap-2 border-gray-300">
                  <div className="bg-yellow-100 text-yellow-800 py-2 px-[10px] lg:py-1.5 lg:px-3 rounded-lg border border-yellow-300">
                    {property.bedroom} Bedrooms
                  </div>
                  <div className="bg-pink-100 text-pink-800 py-2 px-[10px] lg:py-1.5 lg:px-3 rounded-lg border border-pink-300">
                    {property.bathroom} Bathrooms
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 py-2 px-[10px] lg:py-1.5 lg:px-3 rounded-lg border border-indigo-300">
                    {property.area} sq ft
                  </div>
                  <div className="bg-indigo-100 text-green-800 py-2 px-2 lg:py-1.5 lg:px-3 rounded-lg border border-green-300">
                    {property.floor} Floor
                  </div>
                  <Link
                    to={`/property/${property.unique_id}`}
                    className="bg-yellow-500 text-white md:hidden py-2 px-5 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
                <div className="lg:flex hidden justify-end">
                  <Link
                    to={`/property/${property.unique_id}`}
                    className="bg-yellow-500 text-white py-2 px-5 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="flex items-center justify-center text-lg capitalize">
            No properties found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Sale;
