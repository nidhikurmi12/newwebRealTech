import React, { useEffect, useState } from "react";
import Request from "../../lib/axios";
import api from "../../config/api.conf";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [galleryList, setGalleryList] = useState([]);


  const allGalleryList = async () => {
    try {
      const result = await Request.get(api.gallery);
      setGalleryList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredImages = galleryList.filter(
    (img) => selectedCategory === "All" || img.purpose === selectedCategory
  );

  useEffect(() => {
    allGalleryList();
  }, []);

  return (
    <div className="pl-[10px] pr-[10px] sm:p-10 lg:p-20 bg-gray-100 mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-0 mt-6">
          Discover Your Dream Property
        </h1>
        <div className="flex space-x-2 sm:space-x-4">
          <button
            className={`lg:px-3 px-6 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium ${
              selectedCategory === "All"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            className={`lg:px-3 px-6 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium ${
              selectedCategory === "Rent"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory("Rent")}
          >
            Rent
          </button>
          <button
            className={`lg:px-3 px-6 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium ${
              selectedCategory === "Sell"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory("Sell")}
          >
            Sale
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-6 sm:mb-8 text-center sm:text-left">
        Explore our curated selection of properties available for rent and sale.
        Browse through our gallery to find your next home!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className="w-full h-48 sm:h-64 overflow-hidden rounded-lg shadow-lg"
          >
            {img.gallery[0]?.image_url ? (
              <img
                src={img.gallery[0].image_url}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p>{`Gallery ${index}`}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
