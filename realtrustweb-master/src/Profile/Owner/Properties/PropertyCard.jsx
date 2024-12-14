import React, { useContext, useEffect, useState } from "react";
import HomeImg from "../../../assets/Images/Home-img/slider1.jpeg";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaSquare } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";

import { useDisclosure } from "@nextui-org/react";

import { Updatemodel } from "./Updatemodel";

const PropertyCard = ({ property, deleteProperty }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {property && property.length > 0 ? (
        property.map((propertyItem) => (
          <div
            key={propertyItem.unique_id}
            className="lg:w-[305px] w-full relative flex flex-col border border-gray-200 rounded-lg  hover:shadow-lg hover:shadow-[rgba(0,0,0,0.25)] bg-white mb-6"
          >
            <div className="offline-classes w-full h-auto flex flex-col justify-between cursor-pointer">
              <div className="relative">
                <img
                  src={
                    propertyItem.image ||
                    (Array.isArray(propertyItem.gallery) &&
                      propertyItem.gallery[0]?.image_url) ||
                    HomeImg
                  }
                  alt={propertyItem.title || "Property Image"}
                  className="fluid-img w-full h-52 lg:h-[150px] object-cover rounded-t-lg"
                  onError={(e) => (e.target.src = HomeImg)}
                />
                {propertyItem.status !== "Delete" && (
                  <div className="absolute top-2 right-0 flex gap-2 hover:opacity-100 transition-opacity duration-200 z-40">
                    <PiNotePencilBold
                      size={28}
                      className="text-yellow-500 bg-black p-1 rounded-full cursor-pointer"
                      onClick={() => {
                        onOpen();
                      }}
                    />

                    <BsTrash
                      size={28}
                      onClick={() => {
                        deleteProperty(propertyItem.unique_id);
                      }}
                      className="bg-black text-red-500 p-1 rounded-full cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <div className="information flex items-center justify-between p-4 pb-1 cursor-pointer">
                <div className="growth flex items-center gap-2.5">
                  <p className="text-xs opacity-60">
                    {propertyItem.type || "Type"}
                  </p>
                </div>
                <div className="rating flex items-center gap-1.5 border border-yellow-400 px-3 rounded">
                  <span className="text-sm text-yellow-500">
                    {propertyItem.purpose || "RENT"}
                  </span>
                </div>
              </div>
              <div className="title px-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {propertyItem.title} {propertyItem.bhk} BHK
                </h2>
              </div>
              <div className="title px-4 py-2">
                <span
                  className="text-gray-700 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      propertyItem.description || "this is my description",
                  }}
                ></span>
              </div>
              <div className="text-gray-600 px-4 pb-2">
                <p>
                  Location:
                  <span className="font-semibold"> {propertyItem.city}</span>
                </p>
                <p className="mb-1">
                  Price:{" "}
                  <span className="font-semibold text-yellow-600">
                    ₹{propertyItem.price}
                  </span>
                </p>
                <p className="mb-1">
                  Area:{" "}
                  <span className="font-semibold">
                    {propertyItem.area} sq ft
                  </span>
                </p>
              </div>
              <div className="pricing-level px-4 pt-1 pb-12 bg-green-100 bg-opacity-10">
                <div className="flex gap-2">
                  <div className="flex items-center bg-yellow-100 text-yellow-800 py-1 px-2 rounded border border-yellow-300">
                    <FaBed className="mr-1" /> {propertyItem.bedroom}
                  </div>
                  <div className="flex items-center bg-pink-100 text-pink-800 py-1 px-2 rounded border border-pink-300">
                    <FaBath className="mr-1" /> {propertyItem.bathroom}
                  </div>
                  <div className="flex items-center bg-indigo-100 text-indigo-800 py-1.5 px-3 rounded-lg border border-indigo-300">
                    <FaSquare className="mr-1" /> {propertyItem.area}
                  </div>
                </div>
              </div>
              {propertyItem.status === "Active" ? (
                <Link
                  to={`/property/${propertyItem.unique_id}`}
                  className="absolute bottom-0 left-0 w-full  bg-gradient-to-br from-yellow-400 to-yellow-500 flex justify-between text-white py-1 px-4 rounded-b-md hover:bg-yellow-600 transition mt-auto"
                >
                  View Details <FaArrowRight size={20} />
                </Link>
              ) : (
                <div className="absolute bottom-0 left-0 w-full text-center bg-zinc-700 flex items-center justify-between text-white py-1 rounded-b-md hover:bg-zinc-600 transition mt-auto">
                  <h2 className="w-full text-center select-none">
                    {propertyItem.status}
                  </h2>
                </div>
              )}
            </div>

            {isOpen && (
              <Updatemodel
                propertyItem={propertyItem}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              />
            )}
          </div>
        ))
      ) : (
        <div className="col-span-4">
          <p className="text-center">No Properties Found</p>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
