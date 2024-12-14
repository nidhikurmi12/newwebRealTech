import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/Logo/Real Trust Logo.jpg";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-11 sm:flex-row">
            {/* Logo and Description */}
            <div className="flex flex-col items-center mb-6 sm:mb-0 sm:items-start sm:w-1/3">
              <img src={Logo} alt="Real Trust Logo" className="h-28 mb-4" />
              <p className="text-center sm:text-left text-gray-300 text-xs sm:text-sm max-w-xs sm:max-w-md leading-relaxed">
                Real Trust is committed to providing exceptional service and
                helping you find the perfect property to call home. Whether
                you're looking to buy, rent, or invest, our team is here to
                guide you every step of the way. Explore our listings and
                discover your next opportunity with confidence.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mb-6 sm:mb-0 sm:w-1/3">
              <h4 className="text-yellow-500 text-lg font-semibold mb-4">
                Contact Us
              </h4>
              <p className="mb-2">
                3015 Grand Ave, Coconut Grove,
                <br /> Merrick Way, FL 12345
              </p>
              <p className="mb-2">
                Phone:{" "}
                <a href="tel:123-456-7890" className="hover:text-yellow-500">
                  123-456-7890
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@yourwebsite.com"
                  className="hover:text-yellow-500 "
                >
                  info@yourwebsite.com
                </a>
              </p>
            </div>

            {/* Property Types */}
            <div className="mb-6 sm:mb-0 sm:w-1/3">
              <h4 className="text-yellow-500 text-lg font-semibold mb-4">
                Property Types
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Commercial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Office
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Residential
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Apartment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Apartment Building
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Condominium
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Single Family Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Villa
                  </a>
                </li>
              </ul>
            </div>

            {/* Service Points */}
            <div className="mb-6 sm:mb-0 sm:w-1/3">
              <h4 className="text-yellow-500 text-lg font-semibold mb-4">
                Service Points
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Property Valuation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Mortgage Assistance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Property Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Investment Consulting
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Rental Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="mb-6 sm:mb-0 sm:w-1/3">
              <h4 className="text-yellow-500 text-lg font-semibold mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-yellow-500">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-white hover:text-yellow-500">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-white hover:text-yellow-500">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-black border-t-2 border-yellow-500 text-center py-4">
        <p className="text-yellow-500 text-md">
          © 2024 Real Trust. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
