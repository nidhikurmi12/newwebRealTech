import React, { useState } from 'react';
import { FaPhoneAlt, FaLock } from 'react-icons/fa';

const OtpForm = ({
  phoneNumber,
  otp,
  isOtpSent,
  countdown,
  onPhoneNumberChange,
  onSendOtp,
  onOtpChange,
  onLogin,
  onResendOtp
}) => {
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    setError(''); // Clear any existing errors
    onSendOtp();
  };

  return (
    <form>
      {!isOtpSent ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  onPhoneNumberChange(e.target.value);
                  setError(''); // Clear error when typing
                }}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Phone Number"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="button"
            onClick={handleSendOtp}
            className={`w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend OTP in ${countdown} sec` : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => onOtpChange(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter OTP"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onLogin}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onResendOtp}
            className="w-full bg-yellow-300 text-gray-700 py-3 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-4"
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend OTP in ${countdown} sec` : 'Resend OTP'}
          </button>
        </>
      )}
    </form>
  );
};

export default OtpForm;
