import { useContext, useEffect, useState } from "react";
import Request from "../lib/axios";
import api from "../config/api.conf";
import { accessTokenFromLocalStorageOfUser, logoutUser } from "../helper";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Components/spinner";
import { toast } from "react-toastify";
import { ProfileContext } from "../contexts/profileContext";

const UseUserAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  useEffect(() => {
    const UserOwnerAuth = async () => {
      try {
        const result = await Request.get(api.userProfile, {
          headers: {
            Authorization: accessTokenFromLocalStorageOfUser(),
          },
        });
        if (result.data.status) {
          setIsAuthenticated(true);
          setLoading(false);
          setUserProfile(result.data.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
        toast(error.response.data.message);
        setUserProfile(null);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    UserOwnerAuth();
  }, []);

  if (loading) {
    return (
      <h1 className="h-screen w-screen bg-black flex items-center justify-center ">
        <Spinner />
      </h1>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default UseUserAuth;
