// src/components/PagesDropdown.js
import React from "react";
import { Link } from "react-router-dom";

const PagesDropdown = ({ isDropdownOpen, closeMenu, isActive }) => {
  return (
    isDropdownOpen && (
      <ul className="lg:absolute static left-[27px] w-[85%] lg:left-[-10px]  bg-black text-yellow-500 shadow-lg rounded-lg lg:py-3  py-1 px-3 lg:w-40 transition-all duration-300 ease-out dropdown-menu">
        <li>
          <Link
            to="/gallery"
            className={`block lg:px-4 pl-1 py-2 mb-2 ${isActive(
              "/gallery"
            )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 rounded-lg`}
            onClick={closeMenu}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/faqs"
            className={`block  lg:px-4 pl-1 lg:py-2  ${isActive(
              "/faqs"
            )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 rounded-lg`}
            onClick={closeMenu}
          >
            FAQs
          </Link>
        </li>
      </ul>
    )
  );
};

export default PagesDropdown;
