import { useContext, useEffect, useState } from "react";
import Request from "../lib/axios";
import api from "../config/api.conf";
import { accessTokenFromLocalStorageOfOwner, logoutOwner } from "../helper";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Components/spinner";
import { toast } from "react-toastify";
import { ProfileContext } from "../contexts/profileContext";

const UseOwnerAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  useEffect(() => {
    const AuthOwner = async () => {
      try {
        const result = await Request.get(api.ownerProfile, {
          headers: {
            Authorization: accessTokenFromLocalStorageOfOwner(),
          },
        });

        if (result.data.status) {
          setIsAuthenticated(true);
          setLoading(false);
          setUserProfile(result.data.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        logoutOwner()
        navigate("/login");
        toast(error.response.data.message);
        setUserProfile(null);
       
      } finally {
        setLoading(false);
      }
    };

    AuthOwner();
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

export default UseOwnerAuth;
