import React, { useContext } from "react";
import Logo from "../../assets/Logo/Real Trust Logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/profileContext";
import { handleAddPropertyClick } from "../../helper/stateManager";

const MainFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useContext(ProfileContext);

  const handleClick = () => {
    if (location.pathname == "/ownerprofile") {
      handleAddPropertyClick();
    } else {
      window.sessionStorage.setItem("isAddpost", "true");
      navigate("/ownerprofile");
    }
  };
  return (
    <>
      <footer className="bg-black">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div>
              <img src={Logo} alt="Real Trust Logo" className="h-28 mb-4" />
              <p className="text-center sm:text-left text-gray-300 text-xs sm:text-sm max-w-xs sm:max-w-md leading-relaxed">
                Real Trust is committed to providing exceptional service and
                helping you find the perfect property to call home. Whether
                you're looking to buy, rent, or invest, our team is here to
                guide you every step of the way. Explore our listings and
                discover your next opportunity with confidence.
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-lg font-semibold text-yellow-500">
                Contact Us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <p className="mb-2">
                    3015 Grand Ave, Coconut Grove,
                    <br /> Merrick Way, FL 12345
                  </p>
                </li>
                <li className="mb-4">
                  <p className="mb-2">
                    Phone:{" "}
                    <a
                      href="tel:123-456-7890"
                      className="hover:text-yellow-500"
                    >
                      123-456-7890
                    </a>
                  </p>
                </li>
                <li className="mb-4">
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@yourwebsite.com"
                      className="hover:text-yellow-500 max-sm:text-xs"
                    >
                      info@yourwebsite.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-lg font-semibold text-yellow-500">
                Property Types
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/rent" className="hover:text-yellow-500">
                    Rent
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/sale" className="hover:text-yellow-500">
                    Sale
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/upcoming-projects"
                    className="hover:text-yellow-500"
                  >
                    Upcoming Projects
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/blog" className="hover:text-yellow-500">
                    Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/gallery" className="hover:text-yellow-500">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-lg font-semibold text-yellow-500">
                Service Points
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    to="/term-and-condition"
                    className="hover:text-yellow-500"
                  >
                    Terms And Condition
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/project-management"
                    className="hover:text-yellow-500"
                  >
                    Property Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/faqs" className="hover:text-yellow-500">
                    FAQ
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Property Valuation
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Mortgage Assistance
                  </a>
                </li>

                <li className="mb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Investment Consulting
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Rental Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © 2023 <a href="#">Real Trust</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>

        <div
          onClick={handleClick}
          className="fixed font-semibold cursor-pointer flex justify-center rounded-md shadow-lg items-center px-4 py-1  top-24 right-4 bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <p>Post a Property</p>
        </div>
        <div className="fixed flex justify-center rounded-full shadow-lg items-center p-4 bottom-4 right-16 bg-green-500 hover:bg-green-600 text-white z-50">
          <a
            href="https://wa.me/9142950245"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0a11.92 11.92 0 0 0-8.84 3.66A12.07 12.07 0 0 0 0 12.14a11.87 11.87 0 0 0 1.54 5.94L0 24l6.19-1.62a11.81 11.81 0 0 0 5.82 1.47h.05a12.05 12.05 0 0 0 8.59-3.66A12.15 12.15 0 0 0 24 12a11.92 11.92 0 0 0-3.48-8.52ZM12 21.17a9.78 9.78 0 0 1-5-1.34l-.36-.21-3.68.96.98-3.58-.23-.37A9.8 9.8 0 0 1 12 2.95a9.91 9.91 0 0 1 7.1 17A9.85 9.85 0 0 1 12 21.17Zm5.34-7.4c-.29-.14-1.73-.86-2-1s-.46-.15-.66.15-.76 1-.93 1.21-.34.23-.63.08a8.1 8.1 0 0 1-2.38-1.46 9 9 0 0 1-1.66-2.06c-.18-.3 0-.46.14-.61s.29-.33.43-.5a2 2 0 0 0 .29-.49.54.54 0 0 0-.05-.5c-.14-.15-.66-1.6-.91-2.18s-.48-.5-.66-.51h-.56a1.09 1.09 0 0 0-.8.37A3.26 3.26 0 0 0 6.33 8a6.37 6.37 0 0 0 1.31 3.63 14.56 14.56 0 0 0 4.46 4 5.46 5.46 0 0 0 3.05 1c.74 0 1.2-.21 1.63-.4a2.76 2.76 0 0 0 1.18-1.34 2.39 2.39 0 0 0 .17-1.34c-.09-.15-.26-.23-.55-.37Z" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
