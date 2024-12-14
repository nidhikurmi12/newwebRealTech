import React from "react";
import { useForm } from "react-hook-form";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Request.post(api.contact, data);
      console.log(response);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row gap-4 mx-auto lg:p-6 pl-0 pr-0">
      <div className="mb-12 w-full lg:w-[70%] bg-white shadow-lg rounded-lg px-8 py-3 border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Send Us a Message
        </h3>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-1.5 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-1.5 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Your Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              className={`w-full px-3 py-1.5 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Your Phone Number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              className={`w-full px-3 py-1.5 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Your Message"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              id="gdpr"
              {...register("gdpr", { required: "Consent is required" })}
            />
            <label htmlFor="gdpr" className="ml-2 text-gray-700">
              I consent to having this website store my submitted information so
              they can respond to my inquiry.
            </label>
            {errors.gdpr && (
              <p className="text-red-500">{errors.gdpr.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mb-12 w-full lg:w-[30%] h-fit bg-white shadow-lg rounded-lg px-8 py-3 border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Contact Information
        </h3>
        <ul className="text-gray-700 space-y-2">
          <li>
            <strong>Phone:</strong> 1-800-555-1234
          </li>
          <li>
            <strong>Mobile:</strong> 123-456-7890
          </li>
          <li>
            <strong>Fax:</strong> 1-800-555-1235
          </li>
          <li>
            <strong>Email:</strong> sales@yourwebsite.com
          </li>
          <li>
            <strong>Address:</strong> 3015 Grand Ave, Coconut Grove, Merrick
            Way, FL 12345
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
