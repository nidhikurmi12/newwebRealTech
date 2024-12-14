import React, { useState } from "react";
import {
  FaHome,
  FaFire,
  FaSink,
  FaPlug,
  FaDoorOpen,
  FaBell,
  FaTv,
  FaWind,
  FaTshirt,
  FaTree,
  FaGem,
  FaSwimmer,
  FaWifi,
} from "react-icons/fa";
import { MdOutlineFireplace } from "react-icons/md";

const Amenities = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);

  const colors = [
    "text-[#f89b29]",
    "text-[#eca0ff]",
    "text-[#30c5d2]",
    "text-[#beb15b]",
    "text-[#f2c1ea]",
    "text-[#1c90bf]",
    "text-[#b89c93]",
    "text-[#57ebde]",
    "text-[#07f49e]",
    "text-[#32c4c0]",
    "text-[#60efff]",
    "text-[#0061ff]",
    "text-[#696eff]",
  ];
  const amenityIcons = [
    { icon: <FaHome className="w-6 h-6 mb-1" /> },
    { icon: <FaFire className="w-6 h-6 mb-1" /> },
    { icon: <FaSink className="w-6 h-6 mb-1" /> },
    { icon: <FaPlug className="w-6 h-6 mb-1" /> },
    { icon: <FaDoorOpen className="w-6 h-6 mb-1" /> },
    { icon: <FaBell className="w-6 h-6 mb-1" /> },
    {
      icon: <MdOutlineFireplace className="w-6 h-6 mb-1" />,
    },
    { icon: <FaTv className="w-6 h-6 mb-1" /> },
    { icon: <FaWind className="w-6 h-6 mb-1" /> },
    { icon: <FaTshirt className="w-6 h-6 mb-1" /> },
    { icon: <FaTree className="w-6 h-6 mb-1" /> },
    { icon: <FaGem className="w-6 h-6 mb-1" /> },
    { icon: <FaSwimmer className="w-6 h-6 mb-1" /> },
    { icon: <FaWifi className="w-6 h-6 mb-1" /> },
  ];

  return (
    <>
      {/* For mobile */}
      <div className="p-4 sm:hidden flex flex-col justify-center items-center bg-white rounded-lg shadow-md border border-gray-300 relative">
        <h2 className="text-lg font-semibold text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
          Society Amenities
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-8">
          {amenities.map((amenity, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center text-[#262525]"
              >
                <span
                  className={`${colorClass} flex w-full items-center justify-center`}
                >
                  {amenityIcons[index]?.icon}
                </span>
                <span className="w-full items-center justify-center text-nowrap">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center items-center">
          <button
            className="text-orange-600 font-semibold hover:text-orange-700 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      </div>

      {/* For large device */}
      <div className="p-4 hidden sm:block bg-white rounded-lg border-gray-300 shadow-md border relative">
        <h2 className="text-lg font-semibold text-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
          Society Amenities
        </h2>
        <div className="grid sm:grid-cols-4 grid-cols-3 gap-5 mt-8">
          {amenities.map((amenity, index) => {
            const colorClass = colors[index % colors.length];

            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`${colorClass}`}>
                  {amenityIcons[index]?.icon}
                </div>
                <span className="text-black px-2 py-1 rounded-md">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Amenities;
