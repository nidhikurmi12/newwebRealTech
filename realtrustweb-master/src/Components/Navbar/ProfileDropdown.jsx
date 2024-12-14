import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutBothUser } from "../../helper";
import { ProfileContext } from "../../contexts/profileContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useContext(ProfileContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const handleLogout = () => {
    setUserProfile(null);
    logoutBothUser();
    navigate("/");
  };

  return (
    <>
      {userProfile ? (
        <div className="relative">
          <button
            id="dropdownAvatarNameButton"
            onClick={toggleDropdown}
            className="flex items-center mr-6 text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-yellow-500 dark:hover:text-yellow-500 md:me-0  focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 me-2 rounded-full border"
              src={userProfile?.image_url}
              alt="user photo"
            />
            <div className="font-medium capitalize max-w-[4rem] text-ellipsis overflow-hidden whitespace-nowrap text-white">
              {userProfile?.name}
            </div>
            <svg
              className="w-4 h-4 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="z-50 absolute bg-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black-700 dark:divide-gray-600 right-2 md:right-[-15px] lg:mt-0 top-12"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium capitalize max-w-[4rem] text-ellipsis overflow-hidden whitespace-nowrap">
                  {userProfile?.name || "Name"}
                </div>
                <div className="truncate">
                  {userProfile?.email || "user@gmail.com"}
                </div>
              </div>
              <ul className=" text-sm text-gray-700 dark:text-gray-200">
                {localStorage.getItem("acessTokenAdmin") && (
                  <li>
                    <Link
                      to="/ownerprofile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {localStorage.getItem("acessTokenUser") && (
                  <li>
                    <Link
                      to="/userprofile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      User Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              <div onClick={handleLogout}>
                <div className="hover:cursor-pointer block px-4 py-3 text-sm text-gray-700 hover:rounded-b-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="hidden md:block bg-yellow-500 text-lg text-white py-2 px-8 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;