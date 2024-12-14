import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ScheduleConfirmation = () => {
    const [loading, setLoading] = useState(true);
    const propertyName = localStorage.getItem('propertyName');
    const phoneNumber = localStorage.getItem('phoneNumber');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="relative flex flex-col items-center justify-center text-center bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-sm mx-auto">
                    <div className="w-16 h-16 border-4 border-t-4 border-yellow-400 border-solid rounded-full animate-spin mb-4"></div>
                    <p className="text-lg text-gray-700 mb-2">We’re confirming your scheduling...</p>
                    <p className="text-base text-gray-600">
                        Please hold on while we finalize the details for <strong>{propertyName}</strong>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen mt-8 bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg border border-gray-200 text-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto w-full">
                    <div className="mb-6">
                        <FaCheckCircle className="text-green-500 text-5xl sm:text-6xl mb-4 mx-auto" />
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-black mb-4 sm:mb-6 whitespace-normal">
                            Congratulations! Your Property Scheduling is Confirmed!
                        </h1>
                    </div>
                    <div className="mb-4 sm:mb-6">
                        <p className="text-base sm:text-lg text-gray-700 mb-2">
                            <span className="font-medium">Property Name:</span> <strong>{propertyName}</strong>
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 mb-4">
                            <span className="font-medium">Phone Number:</span> <strong>{phoneNumber}</strong>
                        </p>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 mb-4">
                        Thank you for scheduling your property. Our team will reach out to you shortly.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                        Your property visit is scheduled between <strong>4:00 PM</strong> and <strong>6:00 PM</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScheduleConfirmation;
