import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload, FiEye, FiEyeOff } from "react-icons/fi";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isHomeSeeker, setIsHomeSeeker] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const handleToggle = (isHomeSeeker) => {
    setIsHomeSeeker(isHomeSeeker);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_no", data.mobile_no);
    formData.append("password", data.password);

  
    const registerApi = isHomeSeeker ? api.userRegister : api.ownerRegister
    console.log(registerApi)
    try {
      
      const result = await Request.post(registerApi, formData);
  
      toast(result.data.message);
      navigate("/login")

    } catch (error) {
    
      const err = error.response.data.errors;
      if (Object.keys(err).length === 0) {
        toast(error.response.data.message)
      } else {
        const val = Object.values(err);
        toast(val[0][0]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 mt-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-yellow-600 mb-6 text-center">
          {isHomeSeeker
            ? "Home Seeker Registration"
            : "Property Owner Registration"}
        </h1>

        <div className="mb-6 text-center">
          <button
            onClick={() => handleToggle(true)}
            className={`px-4 py-2 mr-2 rounded-lg ${
              isHomeSeeker
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Home Seeker
          </button>
          <button
            onClick={() => handleToggle(false)}
            className={`px-4 py-2 rounded-lg ${
              !isHomeSeeker
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Property Owner
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Full Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="mobile_no"
            >
              Mobile Number
            </label>
            <input
              id="mobile_no"
              type="tel"
              {...register("mobile_no", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your mobile number"
            />
            {errors.mobile_no && (
              <p className="text-red-500">{errors.mobile_no.message}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <FiEye className="text-gray-500" />
              ) : (
                <FiEyeOff className="text-gray-500" />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

         

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
