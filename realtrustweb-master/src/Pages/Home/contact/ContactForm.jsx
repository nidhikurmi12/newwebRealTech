import React from 'react';
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'; // Import icons

const ContactForm = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mx-auto w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center flex items-center justify-center">
        <FaPhoneAlt className="text-yellow-500 mr-2" /> {/* Phone icon */}
        Let Us Call You!
      </h2>
      <p className="mb-4 text-gray-600 text-center flex items-center justify-center">
        <FaRegEnvelope className="text-yellow-500 mr-2" /> {/* Message icon */}
        To help you choose your property
      </p>
      <form className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 transition duration-200"
              required
              aria-required="true"
            />
          </div>
          <div className="flex-1">
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Your Number"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 transition duration-200"
              required
              aria-required="true"
              pattern="[0-9]{10}" // Example pattern for phone numbers
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 transition duration-200"
            required
            aria-required="true"
          />
        </div>
        <div className="flex flex-col mb-4">
          <textarea
            id="property"
            name="property"
            placeholder="Tell us about desired property"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-500 transition duration-200 h-24 resize-none"
            required
            aria-required="true"
          />
        </div>
        <div className="flex items-start space-x-3 mb-4">
          <input
            type="checkbox"
            id="gdpr"
            name="gdpr"
            className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
            required
            aria-required="true"
          />
          <label htmlFor="gdpr" className="text-sm text-gray-700">
            I consent to having this website store my submitted information so they can respond to my inquiry.
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
