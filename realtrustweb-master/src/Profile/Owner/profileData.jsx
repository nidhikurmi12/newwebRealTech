import React from "react";
import ProfileItem from "../../Components/profileItem";
import { PiNotePencilFill } from "react-icons/pi";
const Profile = ({ profileData, onUpdateProfileClick }) => {
  return (
    <div className="bg-white h-auto p-8  rounded-md flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="hidden sm:block font-bold text-2xl">
          Owner Profile Data
        </h1>
        
        <button
          onClick={onUpdateProfileClick}
          className="flex bg-yellow-600 text-white whitespace-nowrap py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <PiNotePencilFill className="text-xl" />
          Edit
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <ProfileItem title="Name" value={profileData.name} />
        <ProfileItem
          title="Aadhaar Card Url"
          value={profileData.aadhaar_card_url}
        />
        <ProfileItem title="Company Name" value={profileData.company_name} />
        <ProfileItem title="Email" value={profileData.email} />
        <ProfileItem title="Mobile Number" value={profileData.mobile_no} />
      </div>
    </div>
  );
};

export default Profile;
