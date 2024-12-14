import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "./ButtonGroup";
import OtpForm from "./OtpForm";
import ErrorMessage from "./ErrorMessage";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { toast } from "react-toastify";
import {
  setacessTokenForOwner,
  setacessTokenForUser,
} from "../../helper/index";
import { ProfileContext } from "../../contexts/profileContext";
import OwnerImg from "../../assets/Images/Home-img/ownership.png";
import UserImg from "../../assets/Images/Home-img/user.png";
const Login = () => {
  const [isHomeSeeker, setIsHomeSeeker] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferralPage, setShowReferralPage] = useState(false);
  const navigate = useNavigate();
  const { setUserProfile } = useContext(ProfileContext);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleToggle = (isHomeSeeker) => {
    setIsHomeSeeker(isHomeSeeker);
    setIsOtpSent(false);
    setOtp("");
    setError("");
    setCountdown(0);
  };

  window.scrollTo(0, 0);
  const sendOtp = async () => {
    const apiUrl = isHomeSeeker ? api.sendOtpToUser : api.sendOtpToOwner;
    const userType = isHomeSeeker ? "user" : "owner";
    try {
      const result = await Request.post(apiUrl, {
        mobile_no: phoneNumber,
        type: userType,
      });
      toast(result.data.message);
      setOtp(result.data.otp); // For testing purposes only
      return true;
    } catch (error) {
      toast(error.response?.data?.message || "Failed to send OTP.");
      console.error(error);
      return false;
    }
  };

  const handleSendOtp = async () => {
    setIsOtpSent(true);
    if (!phoneNumber) {
      setError("Phone number is required.");
      return;
    }
    if (await sendOtp()) {
      setCountdown(20);
      setError("");
    }
  };

  const handleResendOtp = () => {
    setCountdown(20);
    setError("");
    sendOtp();
  };

  const handleLogin = async () => {
    const apiUrl = isHomeSeeker ? api.userLogin : api.ownerLogin;
    const tokenSetter = isHomeSeeker
      ? setacessTokenForUser
      : setacessTokenForOwner;
    const redirectTo = isHomeSeeker ? "/userprofile" : "/ownerprofile";

    try {
      const result = await Request.post(apiUrl, {
        mobile_no: phoneNumber,
        otp: otp.toString(),
        type: isHomeSeeker ? "user" : "owner",
      });

      if (result.status === 200) {
        tokenSetter(result.data.token);
        setUserProfile(result.data.user);
        const IsRedirect = sessionStorage.getItem("IsRedirect") === "true";
        if (IsRedirect) {
          navigate(-1);
          sessionStorage.removeItem("IsRedirect");
        } else {
          navigate(redirectTo);
        }
      }
    } catch (error) {
      toast(error.response?.data?.message || "Login failed.");
      setUserProfile({});
      console.error(error);
    }
    setError("");
  };

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("referralCode", referralCode);

    navigate(isHomeSeeker ? "/userprofile" : "/ownerprofile");
  };
  useEffect(() => {
    return () => {
      const IsRedirect = sessionStorage.getItem("IsRedirect") === "true";
      if (IsRedirect) {
        sessionStorage.removeItem("IsRedirect");
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100 mt-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {showReferralPage ? (
            "Enter Your Details"
          ) : isHomeSeeker ? (
            <>
              <div className="flex gap-2 items-center justify-center">
                <img src={UserImg} alt="icon" className="w-12 h-12" />
                Home Seeker Login
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center justify-center">
                <img src={OwnerImg} alt="icon" className="w-12 h-12" />
                Property Owner Login
              </div>
            </>
          )}
        </h1>
        <ButtonGroup isHomeSeeker={isHomeSeeker} onToggle={handleToggle} />
        <ErrorMessage message={error} />
        {showReferralPage ? (
          <form onSubmit={handleReferralSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your full name"
                required
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Submit
            </button>
          </form>
        ) : (
          <OtpForm
            phoneNumber={phoneNumber}
            otp={otp}
            isOtpSent={isOtpSent}
            countdown={countdown}
            onPhoneNumberChange={setPhoneNumber}
            onSendOtp={handleSendOtp}
            onOtpChange={setOtp}
            onLogin={handleLogin}
            onResendOtp={handleResendOtp}
          />
        )}
        {/* <p className="mt-4 text-center text-gray-600">
          {isHomeSeeker ? "Not a member?" : "Not a member?"}
          <a href="/signup" className="text-yellow-600 hover:underline ml-1">
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
