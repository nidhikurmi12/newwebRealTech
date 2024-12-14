import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Real Trust Logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import PagesDropdown from "./PagesDropdown";

import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePagesDropdown = (e) => {
    e.preventDefault();
    setIsPagesDropdownOpen(!isPagesDropdownOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsPagesDropdownOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-yellow-500 text-white" : "";

  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (
    //     !event.target.closest(".mobile-menu") &&
    //     !event.target.closest(".dropdown-menu")
    //   ) {
    //     closeMenu();
    //   }
    // };
    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-yellow-500 shadow-lg fixed w-full top-0 left-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between py-1">
        <div className="flex justify-between w-full lg:justify-normal lg:w-auto">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Real Trust Logo" className="h-20" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-yellow-500 text-2xl p-4 "
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <MdClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-2 items-center mr-5">
          <li>
            <Link
              to="/"
              className={`text-lg ${isActive(
                "/"
              )} hover:bg-yellow-500 hover:text-white  transition-colors duration-300 py-2 px-2 rounded-lg`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/rent"
              className={`text-lg ${isActive(
                "/rent"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Rent
            </Link>
          </li>
          <li>
            <Link
              to="/sale"
              className={`text-lg ${isActive(
                "/sale"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Sale
            </Link>
          </li>

          <li
            className="relative"
            onMouseEnter={() => setIsPagesDropdownOpen(true)}
            onMouseLeave={() => setIsPagesDropdownOpen(false)}
          >
            <Link
              to="/pages"
              onClick={handlePagesDropdown}
              className={`text-lg ${
                isActive("/gallery") || isActive("/faqs")
                  ? "bg-yellow-500 text-black"
                  : ""
              } hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg flex items-center`}
            >
              Pages
            </Link>
            <PagesDropdown
              isDropdownOpen={isPagesDropdownOpen}
              closeMenu={closeMenu}
              isActive={isActive}
            />
          </li>

          <li>
            <Link
              to="/upcoming-projects"
              className={`text-lg ${isActive(
                "/upcoming-projects"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Upcoming Projects
            </Link>
          </li>
          <li>
            <Link
              to="/project-management"
              className={`text-lg ${isActive(
                "/project-management"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Property Management
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`text-lg ${isActive(
                "/blog"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-lg ${isActive(
                "/contact"
              )} hover:bg-yellow-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Login Button */}

        <div className="">
          <ProfileDropdown />
        </div>
      </div>
      {/* Mobile side navigation */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
          {/* Mobile Menu */}
          <div
            className="fixed inset-0 w-full bg-black text-yellow-500 z-50 transform transition-transform duration-500 ease-in-out mobile-menu"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex flex-col h-full px-6 py-4">
              {/* Header with Logo */}
              <div className="flex items-center justify-between mb-6 border-b border-yellow-500 pb-4">
                <Link to="/" className="flex items-center">
                  <img src={Logo} alt="Real Trust Logo" className="h-12" />
                </Link>
                <button
                  onClick={toggleMenu}
                  className="text-2xl text-yellow-500 mr-5"
                  aria-label="Close menu"
                >
                  <MdClose />
                </button>
              </div>

              {/* Menu Items */}
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link
                    to="/"
                    className={`text-lg ${isActive(
                      "/"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rent"
                    className={`text-lg ${isActive(
                      "/rent"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Rent
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sale"
                    className={`text-lg ${isActive(
                      "/sale"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Sale
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pages"
                    onClick={handlePagesDropdown}
                    className={`text-lg justify-between ${
                      isActive("/gallery") || isActive("/faqs")
                        ? "bg-yellow-500 text-black"
                        : ""
                    } hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg flex items-center`}
                  >
                    Pages
                    <IoIosArrowDown
                      className={`ml-1 transition-transform duration-300 ${
                        isPagesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  <PagesDropdown
                    isDropdownOpen={isPagesDropdownOpen}
                    closeMenu={closeMenu}
                    isActive={isActive}
                  />
                </li>

                <li>
                  <Link
                    to="/upcoming-projects"
                    className={`text-lg ${isActive(
                      "/upcoming-projects"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Upcoming Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/project-management"
                    className={`text-lg ${isActive(
                      "/project-management"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Property Management
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blog"
                    className={`text-lg ${isActive(
                      "/blog"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`text-lg ${isActive(
                      "/contact"
                    )} hover:bg-yellow-600 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={`text-lg ${isActive(
                      "/login"
                    )} hover:bg-yellow-600  hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg`}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
