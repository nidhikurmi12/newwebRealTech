import React, { useState, useRef } from "react";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaBell,
  FaUser,
  FaChevronUp,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Sidebar = ({
  activeSection,
  onNavClick,
  onLogout,
  profileData,
  isSidebarOpen,
  onToggleSidebar,
  onAddPropertyClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleNavClick = (section) => {
    if (section === "properties") {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
      onNavClick(section);
    }
  };

  const handleAddPropertyClick = () => {
    if (onAddPropertyClick) {
      onAddPropertyClick();
    }
    if (window.innerWidth < 1024) {
      onToggleSidebar();
    }
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { id: "overview", icon: <FaHome />, label: "Overview" },
    { id: "properties", icon: <FaBuilding />, label: "Properties" },
    // { id: "requests", icon: <FaClipboardList />, label: "Requests" },
    {
      id: "tenant_verification",
      icon: <MdOutlineVerifiedUser />,
      label: "Tenant verification",
    },
    { id: "Agreement", icon: <FaFileContract />, label: "Agreement" },
    { id: "notifications", icon: <FaBell />, label: "Notifications" },
    { id: "Profile", icon: <FaUser />, label: "Profile" },
  ];
  
  return (
    <div
      className={`fixed lg:block  left-0 h-[100vh] overflow-x-hidden overflow-y-hidden z-30 p-4 pt-14 bg-black text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-72 md:w-1/2 lg:w-72 lg:sticky top-[130px] md:top-20  md:fixed lg:block`}
      style={{
        width: isSidebarOpen && window.innerWidth < 1024 ? "100%" : "",
        maxHeight: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      <button
        onClick={onToggleSidebar}
        className="absolute top-4 right-4 text-white lg:hidden"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`flex flex-col h-full ${
          isSidebarOpen || window.innerWidth >= 992 ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center mb-6">
          {profileData?.image_url ? (
            <img
              src={profileData.image_url}
              alt="Profile"
              className="w-16 h-16 rounded-full cursor-pointer"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-slate-600 text-2xl font-bold">
                {profileData?.fullName?.[0]}
              </span>
            </div>
          )}
          <div className="pl-2">
            <h2 className="text-lg font-semibold">
              {profileData.name || "Owner Name"}
            </h2>
            <p>{profileData.email || "owner@gmail.com"}</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <React.Fragment key={item.id}>
                <li
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-4 flex items-center rounded-md cursor-pointer hover:bg-slate-800 ${
                    activeSection === item.id ? "bg-slate-800" : ""
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                  {item.id === "properties" && (
                    <span className="ml-auto">
                      {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  )}
                </li>
                {isDropdownOpen && item.id === "properties" && (
                  <ul className="mt-1 bg-slate-800 text-white rounded-md shadow-lg">
                    <li
                      onClick={() => onNavClick("all-properties")}
                      className="py-2 px-4 flex items-center text-sm rounded-md cursor-pointer hover:bg-slate-800"
                    >
                      All Properties
                    </li>
                    <li
                      onClick={handleAddPropertyClick}
                      className="py-2 px-4 flex items-center text-sm rounded-md cursor-pointer hover:bg-slate-800"
                    >
                      Add Property
                    </li>
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>

          <div className="w-full border-t-1 mt-4">
            <button
              onClick={onLogout}
              className="w-full text-white bg-gradient-to-br from-yellow-400 to-yellow-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
