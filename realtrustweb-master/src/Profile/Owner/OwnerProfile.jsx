import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Overview from "./Overview/Overview";
import Properties from "./Properties/Properties";

// import Settings from "./Settings/Settings";
import Notifications from "./Notifications/Notifications";
// import AddProperty from "../Owner/Properties/AddProperty/AddProperty";
import { FaBars } from "react-icons/fa";

import { accessTokenFromLocalStorageOfOwner, logoutOwner } from "../../helper";
import Requests from "../../Profile/Owner/Requests/Requests";
import { toast } from "react-toastify";
import MyForm from "../User/MyForm";
import api from "./../../config/api.conf";
import { Profile } from "../User/Profile";
import { ProfileContext } from "../../contexts/profileContext";
import { useNavigate } from "react-router-dom";
import Agreement from "./drafts/agreement";
import Request from "./../../lib/axios";
import NewPropertyAdd from "./Properties/AddProperty/NewPropertyAdd";
import {initializeState} from "../../helper/stateManager"

const OwnerProfile = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [profileData, setProfileData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dashboardData, setDashboardData] = useState(null);
  const token = accessTokenFromLocalStorageOfOwner();
  const { checkIsLoggedIn, setUserProfile,refreshProfile } = useContext(ProfileContext);
  const [notifications, setNotifications] = useState([]);
 
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMobile) setIsSidebarOpen(false);
  };

  const profileApi = async () => {
    try {
      const result = await Request.get(api.ownerProfile, {
        headers: {
          Authorization: token,
        },
      });
      setProfileData(result.data.data);
    } catch (error) {}
  };

  const propertiesApi = async () => {
    try {
      const result = await Request.post(
        "/owner/properties/properties_list",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log("in error");
      console.log(error);
    }
  };
  async function dashboardDetails() {
    try {
      const Result = await Request.get(api.ownerDashboard, {
        headers: {
          Authorization: token,
        },
      });

      setDashboardData(Result.data.counts);
    } catch (error) {
      setDashboardData(error.data.counts);
    }
  }

  const updateUserProfile = async (updatedData) => {
    try {
      const result = await Request.post(api.ownerProfile, updatedData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileData(result.data.data);
      setUserProfile(result.data.data);
      toast("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      console.error("Failed to update profile:", error);
      toast("Failed to update profile");
    }
  };
  async function notification() {
    try {
      const Result = await Request.get(api.ownerNotification, {
        headers: {
          Authorization: token,
        },
      });

      setNotifications(Result.data.data);
      // toast(Result.data.data.message);
    } catch (error) {
      setNotifications(error.data.message);
    }
  }

  function chekNavigateToPost() {
    const isnavigatepresent = window.sessionStorage.getItem("isAddpost");
    if (isnavigatepresent == "true") {
      setActiveSection("add-property");
    }
  }

  useEffect(() => {
    dashboardDetails();
    profileApi();
    propertiesApi();
    notification();
    chekNavigateToPost();
    return () => {
      window.sessionStorage.removeItem("isAddpost");
    };
  }, []);

  const handleLogout = () => {
    logoutOwner();
    checkIsLoggedIn();
    navigate("/");
  };

  const handleAddPropertyClick = () => {
    setActiveSection("add-property");
  };
  useEffect(() => {
    initializeState(setActiveSection);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview profileData={dashboardData} />;
      case "tenant_verification":
        return <MyForm apiurl={api.ownerUplodDoc} token={token} />;
      case "all-properties":
        return (
          <Properties
            properties={profileData.propertiesOwned}
            onAddPropertyClick={handleAddPropertyClick}
          />
        );
      // case "requests":
      //   return <Requests requestHistory={profileData.pendingRequests} />;
      case "Agreement":
        return <Agreement path={api.ownerAgreement} token={token} />;
      case "notifications":
        return <Notifications notifications={notifications} />;
      // case "PropertyAdd":
      //   return <NewPropertyAdd />;
      case "add-property":
        return (
          <NewPropertyAdd
            onAddPropertyClick={handleAddPropertyClick}
            sidebarAction={() => {
              setActiveSection("all-properties");
            }}
          />
        );

      case "Profile":
        return (
          <Profile
            userProfileData={profileData}
            updateUserProfile={updateUserProfile}
          />
        );
      default:
        return <Overview profileData={profileData} />;
    }
  };

  return (
    <>
      <div className={`flex flex-col lg:flex-row bg-gray-200 mt-20`}>
        {isMobile && (
          <div className="lg:hidden flex justify-between py-4 px-6  bg-white">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FaBars className="text-2xl text-yellow-700" />
            </button>
          </div>
        )}

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          activeSection={activeSection}
          onNavClick={handleSectionChange}
          onLogout={handleLogout}
          profileData={profileData}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddPropertyClick={handleAddPropertyClick}
        />

        <div
          className={`flex-1 py-6 px-2 overflow-hidden sm:py-8 sm:px-1 sm:mt-7 md:mt-0 lg:p-6 md:block lg:mt-0 transition-all duration-300 ${
            isMobile && isSidebarOpen ? "hidden" : "block"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
