import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ isDropdownOpen, closeMenu, isActive }) => {
  return (
    isDropdownOpen && (
      <ul className="absolute left-0 mt-10 bg-black text-yellow-500 shadow-lg rounded-lg py-3 px-3 w-40 transition-all duration-300 ease-out dropdown-menu">
        <li>
          <Link
            to="/residential"
            className={`block px-4 py-2 mb-2 ${isActive(
              "/residential"
            )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 rounded-lg`}
            onClick={closeMenu}
          >
            Residential
          </Link>
        </li>
        <li>
          <Link
            to="/commercial"
            className={`block px-4 py-2 ${isActive(
              "/commercial"
            )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 rounded-lg`}
            onClick={closeMenu}
          >
            Commercial
          </Link>
        </li>
      </ul>
    )
  );
};

export default Dropdown;