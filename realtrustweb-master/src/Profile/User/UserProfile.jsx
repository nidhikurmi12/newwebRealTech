import React, { useState, useEffect, useContext } from "react";
import { Profile } from "./Profile";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import {
  accessTokenFromLocalStorageOfUser,
  logoutUser,
} from "../../helper/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyForm from "./MyForm";
import { ProfileContext } from "../../contexts/profileContext";
import {
  FaBars,
  FaFileAlt,
  FaFileSignature,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PaymentHistory from "../Owner/paymenthistory/PaymentHistory";
import Agreement from "../Owner/drafts/agreement";
import UserPropertyCard from "./userPropertyCard";

const UserProfile = () => {
  const [userProfileData, setUserProfileData] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();
  const { checkIsLoggedIn, setUserProfile, refreshProfile } =
    useContext(ProfileContext);
  const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    logoutUser();
    checkIsLoggedIn();
    navigate("/");
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const token = accessTokenFromLocalStorageOfUser();
  const userProfile = async () => {
    try {
      const result = await Request.get(api.userProfile, {
        headers: {
          Authorization: token,
        },
      });
      setUserProfileData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const result = await Request.post(api.userProfile, updatedData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setUserProfileData(result.data.data);
      setUserProfile(result.data.data);
      toast("Profile Updated Successfully");
    } catch (error) {
      toast("Failed to update profile");
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      <div className="w-full mt-[100px] md:mt-[86px] lg:mt-[86px] mb-2">
        <FaBars
          onClick={() => setSidebar(true)}
          className="md:hidden text-3xl text-yellow-500 !ml-3"
        />
      </div>
      <div className="flex h-full w-full bg-gray-100">
        {/* Sidebar */}
        <aside className="sticky top-12 left-0  w-72 bg-black p-6 py-14 flex-shrink-0 hidden md:flex flex-col">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={
                  userProfileData.image_url || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">
                {userProfileData.name || "User Name"}
              </h2>
              <p className="text-sm font-bold text-white">
                {userProfileData.email || "user@gmail.com"}
              </p>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <nav>
            <ul>
              {[
                { id: "profile", icon: <FaUser size={20} />, label: "Profile" },
                {
                  id: "Documents Upload",
                  icon: <FaFileAlt size={20} />,
                  label: "Documents Upload",
                },
                {
                  id: "Agreement",
                  icon: <FaFileSignature size={20} />,
                  label: "Agreement",
                },
                {
                  id: "paymentHistory",
                  icon: <FaWallet size={20} />,
                  label: "Payment History",
                },
                {
                  id: "scheduleHistory",
                  icon: <FaWallet size={20} />,
                  label: "Schedule History",
                },
              ].map((section) => (
                <li key={section.id} className="mb-2">
                  <button
                    onClick={() => handleNavClick(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeSection === section.id
                        ? "bg-gray-700 text-white font-semibold"
                        : "hover:bg-gray-700 hover:text-white text-white"
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      {section.icon}
                      <span className="ml-2">{section.label}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t-1 absolute w-[80%] bottom-0">
            <button
              onClick={handleLogout}
              className="mt-2 w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 bg-gray-100 lg:ml-6 ml-2 mr-2 lg:mr-7 lg:mb-4 mb-4 lg:mt-10 mt-6">
          <SidebarNavigation
            activeSection={activeSection}
            token={token}
            userProfileData={userProfileData}
            updateUserProfile={updateUserProfile}
          />
        </main>
      </div>
      {/* Mobile sidebar */}
      <aside
        className={`${
          !sidebar && "hidden"
        } md:hidden fixed top-0 z-50 w-full h-screen bg-slate-900 p-6 flex-shrink-0 flex flex-col transition-all ease-in-out duration-200`}
      >
        <div className="text-white flex justify-end">
          <IoClose onClick={() => setSidebar(false)} size={30} />
        </div>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
            <img
              src={
                userProfileData.image_url || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">
              {userProfileData.name || "User Name"}
            </h2>
            <p className="text-sm font-bold text-white">
              {userProfileData.email || "user@gmail.com"}
            </p>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <nav>
          <ul>
            {[
              { id: "profile", icon: <FaUser size={20} />, label: "Profile" },
              {
                id: "Documents Upload",
                icon: <FaFileAlt size={20} />,
                label: "Documents Upload",
              },
              {
                id: "Agreement",
                icon: <FaFileSignature size={20} />,
                label: "Agreement",
              },
              {
                id: "paymentHistory",
                icon: <FaWallet size={20} />,
                label: "Payment History",
              },
              {
                id: "scheduleHistory",
                icon: <FaWallet size={20} />,
                label: "Schedule History",
              },
            ].map((section) => (
              <li key={section.id} className="mb-2">
                <button
                  onClick={() => {
                    handleNavClick(section.id);
                    setSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeSection === section.id
                      ? "bg-gray-50 text-black font-semibold"
                      : "hover:bg-gray-50 hover:text-black text-white"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    {section.icon}
                    <span className="ml-2">{section.label}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t-1 absolute w-[80%] bottom-6">
          <button
            onClick={handleLogout}
            className="mt-4 w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const SidebarNavigation = ({
  activeSection,
  token,
  userProfileData,
  updateUserProfile,
}) => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userscheudlehistory, setUserScheudleHistory] = useState([]);
  const userDashboard = async () => {
    try {
      setLoading(true);
      const result = await Request.get(api.userDashboard, {
        headers: {
          Authorization: token,
        },
      });
      setDashboardData(result.data.counts);
    } catch (error) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };
  async function userScheudleHistory() {
    try {
      const Result = await Request.get(api.userScheduleHistory, {
        headers: {
          Authorization: token,
        },
      });
      setUserScheudleHistory(Result.data.data);
    } catch (error) {
      setUserScheudleHistory(error.message);
    }
  }

  useEffect(() => {
    userScheudleHistory();
  }, []);
  useEffect(() => {
    if (activeSection === "overview") {
      userDashboard();
    } else {
      setDashboardData([]);
    }
  }, [activeSection, token]);

  let content;
  switch (activeSection) {
    case "profile":
      content = (
        <div className="max-lg:w-[50vw] max-md:w-[95vw]">
          <Profile
            userProfileData={userProfileData}
            updateUserProfile={updateUserProfile}
          />
        </div>
      );
      break;
    case "Documents Upload":
      content = <MyForm token={token} apiurl={api.userUplodDoc} />;
      break;
    case "paymentHistory":
      content = <PaymentHistory />;
      break;
    case "scheduleHistory":
      content = <UserPropertyCard userscheudlehistory={userscheudlehistory} />;
      break;
    case "Agreement":
      content = (
        <Agreement
          userProfileData={userProfileData}
          path={api.userAggerement}
          token={token}
        />
      );
      break;
    default:
      "profile";
      content = (
        <div className=" max-lg:w-[50vw] max-md:w-[95vw]">
          <Profile
            userProfileData={userProfileData}
            updateUserProfile={updateUserProfile}
          />
        </div>
      );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {content}
    </div>
  );
};

export default UserProfile;
