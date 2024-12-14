import { createContext, useEffect, useState } from "react";
import Request from "../lib/axios";
import api from "../config/api.conf";

export const ProfileContext = createContext(null);

const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [Refresh,setRefreshProfile]=useState(false)
  const checkIsLoggedIn = async () => {
    const ownerToken = localStorage.getItem("acessTokenAdmin");
    const userToken = localStorage.getItem("acessTokenUser");

    if (!ownerToken && !userToken) {
      return setUserProfile(null);
    }

    if (ownerToken) {
      try {
        const result = await Request.get(api.ownerProfile, {
          headers: {
            Authorization: "Bearer " + JSON.parse(ownerToken),
          },
        });
    
        return setUserProfile(result.data.data);
      } catch (error) {
        setUserProfile(null);
      }
    } else {
      try {
        const result = await Request.get(api.userProfile, {
          headers: {
            Authorization: "Bearer " + JSON.parse(userToken),
          },
        });
     
        return setUserProfile(result.data.data);
      } catch (error) {
        setUserProfile(null);
      }
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, [Refresh]); 
  const refreshProfile=()=>setRefreshProfile((prev)=>!prev)
  return (
    <ProfileContext.Provider
      value={{ userProfile, setUserProfile, checkIsLoggedIn,refreshProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
