import React, { useEffect, useState } from "react";
import Destinations1 from "./banglorePlaces/one.webp";
import Destinations2 from "./banglorePlaces/two.webp";
import Destinations3 from "./banglorePlaces/three.webp";
import Destinations4 from "./banglorePlaces/four.webp";
import Destinations5 from "./banglorePlaces/five.webp";
import Request from "../../../lib/axios";
import api from "../../../config/api.conf";

const destinations = [
  { name: "National Gallery of Modern Art", image: Destinations1 },
  { name: "Tipu Sultan's Palace and Fort", image: Destinations2 },
  { name: "Ulsoor Lake", image: Destinations3 },
  { name: "Lalbagh Botanical Garden", image: Destinations4 },
  { name: "Bangalore Palace", image: Destinations5 },
];

const Destinations = () => {
  const [galleryList, setGalleryList] = useState([]);

  const allGalleryList = async () => {
    try {
      const result = await Request.get(api.gallery);
      setGalleryList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allGalleryList();
  }, []);

  return (
    <div className="bg-gray-100 py-0 pl-[8px] pr-[7px] lg:p-6 sm:px-8 md:px-10 lg:px-12">
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg mx-auto w-full max-w-6xl py-4 px-2 lg:p-6">
        {/* First Row: 2 Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {galleryList.slice(0, 2).map((dest, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={dest.gallery[0].image_url}
                alt={dest.city}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
              <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 via-transparent to-transparent text-white text-center py-4 z-10 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold shadow-lg transform scale-75 transition-transform duration-500 hover:scale-100">
                  {dest.city}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row: 3 Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryList.slice(0,3).map((dest, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={dest.gallery[0].image_url}
                alt={dest.city}
                className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 via-transparent to-transparent text-white text-center py-4 z-10 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold shadow-lg transform scale-75 transition-transform duration-500 hover:scale-100">
                  {dest.city}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
