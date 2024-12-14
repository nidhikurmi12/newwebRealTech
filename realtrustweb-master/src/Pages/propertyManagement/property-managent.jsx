import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { toast } from "react-toastify";
import IMG from "../../assets/Videos/video.mp4";
import { Graph, House, Lease, Maintainance, Svg, Verified } from "../../assets";

const PropertyManagement = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const content = `
Most property owners face challenges when it comes to property management in India. Managing tenants, collecting rents, and maintaining the property can be overwhelming, especially for those who live away from their property. This is where RealTrust comes in, offering a seamless and efficient property management service designed to relieve property owners of these burdens. RealTrust is India's leading property management company, providing owners with hassle-free, reliable solutions. We handle everything from tenant screening and rent collection to property maintenance and legal formalities, ensuring that your property is managed efficiently and carefully. Let us help you protect and maximize your investment with our expert property management services.

Why Choose RealTrust For Property Management?
With RealTrust, you can rest assured that your property is in the hands of experts. We streamline every aspect of property management in India, saving you time and effort. Our dedicated team handles everything, allowing you to focus on what matters most. That's why RealTrust is the best choice for property management!

Premium Property Listing: Property listing helps to increase your property’s visibility, attracting potential buyers or tenants faster through greater exposure, top search rankings, and professional support, ensuring quicker and better deals.

Photoshoot Of The Property: High-quality pictures of your property ensure it stands out in the listings and attracts more potential buyers or tenants with an attractive presentation.
Dedicated Relationship Manager: RealTrust provides a dedicated relationship manager to handle all aspects of your property management, offer personalized support, address concerns, and ensure smooth communication between property owners and tenants.

Lifetime Tenant Search: We ensure you always get reliable tenants without paying recurring brokerage fees, making property management hassle-free and cost-effective.

`;

  const onSubmit = async (data) => {
    try {
      const response = await Request.post(api.inquery, data);
      toast(response.data.message);
      reset();
    } catch (error) {
      toast(response.error.errors);
    }
  };
  return (
    <>
      <section className="main_sections_container flex justify-center flex-wrap lg:flex-nowrap mt-28 px-2  pb-5 w-full gap-5">
        {/* Left Section */}
        <section className="cpms_main_cards lg:w-[70%] w-full bg-gray-100 shadow-lg">
          <h2 className="font-semibold text-3xl mb-6 px-5 pt-8">
            What’s in it for you?
          </h2>
          <div className="services_cards grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-5">
            <div className="service flex gap-3 ">
              <img src={Verified} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">VERIFIED TENANTS</h3>
                <p className="text-sm">
                  Search across all avenues , online and offline
                </p>
              </div>
            </div>
            <div className="service flex gap-3 ">
              <img src={Svg} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">MAINTAINANCE AND INTERIORS</h3>
                <p className="text-sm">
                  keeping your property safe , intact and well-maintained
                </p>
              </div>
            </div>
            <div className="service flex gap-3">
              <img src={House} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">TENANT VERIFICATION</h3>
                <p className="text-sm">
                  full support to tenants and their move-in till exit
                </p>
              </div>
            </div>
            <div className="service flex gap-3 ">
              <img src={Lease} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">RENT COLLECTIONS</h3>
                <p className="text-sm">regular follow ups until all dues are</p>
              </div>
            </div>
            <div className="service flex gap-3">
              <img src={Graph} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">Periodic Home Inspection</h3>
                <p className="text-sm">
                  Maintain your property’s value with scheduled, professional
                  inspections.
                </p>
              </div>
            </div>
            <div className="service flex gap-3">
              <img src={Maintainance} alt="icon" className="w-12 h-12" />
              <div className="about_service">
                <h3 className="font-semibold">
                  On-demand Repair &amp; Maintenance Services
                </h3>
                <p className="text-sm">
                  Quick, expert repair and maintenance services at your
                  convenience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <div className="relative flex flex-col rounded-xl bg-white border shadow-lg py-5 px-5 lg:w-[27%] w-full">
          <h4 className="text-xl font-medium text-slate-800">
            Got a property to be managed?
          </h4>
          <p className="text-slate-500 font-light mt-2">
            Just fill up the form & we will take care of the rest.
          </p>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 flex flex-col gap-3">
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-600">
                  Your Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-600">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  placeholder="Your Phone"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-600">
                  Society Name
                </label>
                <input
                  type="text"
                  {...register("society_name", {
                    required: "Society Name is required",
                  })}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  placeholder="Your Society Name"
                />
                {errors.societyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.societyName.message}
                  </p>
                )}
              </div>
            </div>
            <button
              className="mt-4 w-full rounded-md bg-yellow-500 py-2 px-4 text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-yellow-600 focus:shadow-none disabled:opacity-50"
              type="submit"
            >
              Talk to us Today
            </button>
          </form>
        </div>
      </section>

      <div className="main_sections_container justify-start items-center lg:flex-row flex-col mt-2 px-[4px]  md:flex  pb-3 w-full flex gap-5">
        <div className="lg:w-[65%] px-10 lg:ml-8 ml-0 py-4 w-[98%] bg-white shadow-lg border  mb-5 rounded-md">
          <h2 className="text-lg font-semibold">
            Property Management in India by Real Trust
          </h2>
          <p>{isExpanded ? content : `${content.slice(0, 900)}...`}</p>
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={toggleExpanded}
              className="text-blue-500 font-semibold"
            >
              {isExpanded ? (
                <p className="flex items-center gap-2">
                  Show Less <IoIosArrowUp size={20} className="mt-1" />
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  Show More
                  <IoIosArrowDown size={20} className="mt-1" />
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="main_sections_container justify-start items-center lg:flex-row flex-col mt-2 px-[4px]  md:flex  pb-3 w-full flex gap-5">
        <div className="lg:w-[65%] flex justify-center px-10 lg:ml-8 ml-0 py-4 w-[98%] bg-white shadow-lg border  mb-5 rounded-md">
          <iframe
            src={`${IMG}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
            allow="autoplay; encrypted-media"
            allowfullscreen
            className="w-[500px] lg:w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </div>
    </>
  );
};

export default PropertyManagement;
