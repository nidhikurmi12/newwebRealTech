import React, { memo, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { accessTokenFromLocalStorageOfUser } from "../../helper";
import { toast } from "react-toastify";
import { ProfileContext } from "../../contexts/profileContext";
import Spinner from "../../Components/spinner";
import BLogList from "../Blog/blogsList";

const ScheduleForm = ({ onClose, closeBtn, id }) => {
  const [properties, setProperties] = useState({});
  const [buttonText, setButtonText] = useState("Schedule Property");
  const [blogs, setBlogs] = useState([]);
  const [scheduleTiming, setScheduleTiming] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { userProfile } = useContext(ProfileContext);

  const handleClick = async (data) => {
    const formdata = {
      ...data,
      property_id: id,
    };

    setLoading(true);
    try {
      const response = await Request.post(api.userSchedule, formdata, {
        headers: {
          Authorization: accessTokenFromLocalStorageOfUser(),
        },
      });
      toast(response.data.message);
      setScheduleTiming(response.data.schedule_property_timing);
      navigate("/scheduleconfirmation");
    } catch (error) {
      setLoading(false); // Stop loading
      if (error.response?.status === 401) {
        navigate("/login");
        toast("Please Login to schedule");
        sessionStorage.setItem("IsRedirect", "true");
      } else {
        toast(error.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (userProfile) {
      setValue("full_name", userProfile.name || "");
      setValue("email", userProfile.email || "");
      setValue("company", userProfile.company_name || "");
    }
  }, [userProfile, setValue]);

  const allPosts = async () => {
    try {
      const result = await Request.get(api.blogPosts);
      setBlogs(result.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await Request.get(`/properties/${id}/show`, {
          headers: {
            Authorization: accessTokenFromLocalStorageOfUser(),
          },
        });
        setProperties(response.data.data);
        setValue("property_id", response.data.data.title || "");
        setValue("visit_type", response.data.data.tenant_type || "");
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
    allPosts();
  }, [id, setValue]);

  return (
    <div className="w-auto px-5 py-8 lg:p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow-md">
      {closeBtn && (
        <button
          onClick={onClose}
          className="absolute top-8 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FaTimes className="text-xl" />
        </button>
      )}

      <h2 className="text-2xl font-semibold text-black text-center mb-6">
        Schedule a Property
      </h2>
      <form onSubmit={handleSubmit(handleClick)}>
        <div className="mb-4">
          <label htmlFor="property_id" className="block text-black mb-2">
            Property Name:
          </label>
          <input
            id="property_id"
            readOnly
            {...register("property_id", { required: true })}
            value={properties.title || ""}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.property_id && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="full_name" className="block text-black mb-2">
            Full Name:
          </label>
          <input
            type="text"
            id="full_name"
            {...register("full_name", { required: true })}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.full_name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-black mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="visit_type" className="block text-black mb-2">
            Tenant Type:
          </label>
          <input
            id="visit_type"
            readOnly
            {...register("visit_type", { required: true })}
            value={properties.tenant_type || ""}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.visit_type && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="company-name" className="block text-black mb-2">
            Company Name:
          </label>
          <input
            type="text"
            id="company-name"
            {...register("company", { required: true })}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.company && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {userProfile ? (
          <>
            {properties?.schedule_property_timing?.timing ? (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2"
                disabled={true}
              >
                {(() => {
                  const timing = properties.schedule_property_timing.timing;
                  const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
                  const match = timing.match(regex);

                  if (match) {
                    const [datePart, timePart] = match[0].split(" ");
                    const [year, month, day] = datePart.split("-");
                    const formattedDate = new Date(
                      `${year}-${month}-${day}`
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    });

                    const formattedTime = new Date(
                      `${year}-${month}-${day}T${timePart}`
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    return `${formattedDate} ${formattedTime}`;
                  }

                  return "Invalid timing";
                })()}
              </button>
            ) : null}
            {
              <button
                className="w-full mt-2 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2"
                disabled={loading}
              >
                {loading
                  ? "Scheduling..."
                  : scheduleTiming
                  ? scheduleTiming
                  : "Join Property"}
              </button>
            }
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              sessionStorage.setItem("IsRedirect", "true");
            }}
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md"
          >
            Login to Continue
          </button>
        )}
      </form>
    </div>
  );
};

export default memo(ScheduleForm);
