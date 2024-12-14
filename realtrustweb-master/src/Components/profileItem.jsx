import React from "react";
import { FaRegIdCard } from "react-icons/fa6";

const ProfileItem = ({ title, value }) => (
  <div className="bg-gray-500 w-64 px-8 pb-4 pt-3 rounded-md flex-grow">
    <div className="flex gap-3 items-center">
      <FaRegIdCard className="font-bold text-lg text-white" />
      <h2 className="font-bold text-lg text-white">{title}</h2>
    </div>
    <p className="text-md ml-8 text-white line-clamp-2">{value || "No data available"}</p> 
  </div>
);

export default ProfileItem;
