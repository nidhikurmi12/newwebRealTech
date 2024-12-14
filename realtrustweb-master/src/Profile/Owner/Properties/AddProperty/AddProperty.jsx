import React, { useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Request from "../../../../lib/axios";
import api from "../../../../config/api.conf";
import { accessTokenFromLocalStorageOfOwner } from "../../../../helper";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../../../Components/spinner";
import { IoClose } from "react-icons/io5";

const AddProperty = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
  const [city, setCity] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [step, setStep] = useState(1);
  const searchTimeout = useRef(null);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - selectedImages.length);
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  const addPropertyData = async (data) => {
    const formfiled = new FormData();
    formfiled.append("title", data.title);
    formfiled.append("furnish_type", data.furnish_type);
    formfiled.append("city", city);
    formfiled.append("locality", data.locality);
    formfiled.append("society_name", data.society_name);
    formfiled.append("description", data.description);
    formfiled.append("price", data.price);
    formfiled.append("deposit", data.deposit);
    formfiled.append("monthly_rent", data.monthly_rent);
    formfiled.append("maintenance", data.maintenance);
    formfiled.append("purpose", data.purpose);
    formfiled.append("type", data.type);
    formfiled.append("door_facing", data.door_facing);
    formfiled.append("tenant_type", data.tenant_type);
    formfiled.append("bedroom", data.bedroom);
    formfiled.append("bathroom", data.bathroom);
    formfiled.append("balcony", data.balcony);
    formfiled.append("bhk", data.bhk);
    formfiled.append("available_for", data.available_for);
    formfiled.append("area", data.area);
    formfiled.append("age", data.age);
    formfiled.append("additional_detail", data.additional_detail);
    formfiled.append("amenities", data.amenities);
    formfiled.append("longitude", data.longitude);
    formfiled.append("latitude", data.latitude);
    formfiled.append("features", data.features);
    formfiled.append("map_location", data.map_location);

    console.log(selectedImages);
    if (data.gallaryimages[0]) {
      formfiled.append("gallaryimage", selectedImages);
    }
    if (data.photos[0]) {
      formfiled.append("photos", data.photos[0]);
    }

    try {
      const result = await Request.post(api.addPropertyInOwner, formfiled, {
        headers: {
          Authorization: accessTokenFromLocalStorageOfOwner(),
        },
      });
      console.log("nn", result);
      toast(result.data.message);
      reset();
      setSelectedImages([]);
    } catch (error) {
      console.log(error);
    }
  };
  const searchCities = useCallback(async (query) => {
    if (!query) {
      closeSearchBox();
      return;
    }
    setSearchCitiesLoading(true);
    try {
      const result = await axios.get(
        `http://api.geonames.org/searchJSON?q=${query}&featureClass=P&country=IN&username=jeetu`
      );
      setCities(result.data.geonames);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchCitiesLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setCity(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (query) {
      searchTimeout.current = setTimeout(() => {
        searchCities(query);
      }, 500);
    } else {
      setCities([]);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-md lg:w-[75%] w-full ">
        <form onSubmit={handleSubmit(addPropertyData)}>
          {step === 1 && (
            <div className="space-y-4 ">
              <h2 className="text-2xl text-center  mb-6 font-semibold text-black ">
                {" "}
                Post Your Property
              </h2>
              <div>
                <label className="block  text-gray-700 text-lg mb-2">
                  Property Title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Property title is required",
                  })}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  placeholder="Enter property title"
                  required
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Furnish Type
                </label>
                <select
                  {...register("furnish_type", {
                    required: "Furnish Type is required",
                  })}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  required
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
                {errors.furnish_type && (
                  <span className="text-red-500 text-sm">
                    {errors.furnish_type.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Locality
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => handleInputChange(e)}
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Search cities..."
                  />
                  {searchCitiesLoading ? (
                    <div className="absolute top-2 right-3 w-6 h-6">
                      <Spinner />
                    </div>
                  ) : (
                    cities.length > 0 && (
                      <IoClose
                        onClick={() => {
                          setCities([]);
                          setCity("");
                        }}
                        size={20}
                        className="absolute top-2 right-4 cursor-pointer"
                      />
                    )
                  )}
                  {cities.length > 0 && (
                    <div className="max-h-[20vh] absolute top-10 left-0 w-full flex flex-col bg-gray-700 border-2 z-50 overflow-y-auto">
                      {cities.map((city, i) => (
                        <span
                          onClick={() => {
                            setCity(city.name);
                            setCities([]);
                          }}
                          key={i}
                          className="p-2 hover:bg-gray-600 text-white cursor-pointer"
                        >
                          {city.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Locality
                </label>
                <select
                  {...register("locality", {
                    required: "Locality is required",
                  })}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  required
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="option-1">Downtown</option>
                  <option value="option-2">option 2</option>
                  <option value="option-3">option 3</option>
                </select>
                {errors.locality && (
                  <span className="text-red-500 text-sm">
                    {errors.locality.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Society Name
                </label>
                <select
                  {...register("society_name", {
                    required: "Society Name is required",
                  })}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  required
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="option-1">option 1</option>
                  <option value="option-2">option 2</option>
                  <option value="option-3">option 3</option>
                </select>
                {errors.society_name && (
                  <span className="text-red-500 text-sm">
                    {errors.society_name.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  placeholder="Enter description"
                  required
                  rows="4"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                  onClick={handlePrevious}
                  disabled={step === 1}
                >
                  <AiOutlineLeft className="mr-2" /> Previous
                </button>
                <button
                  type="button"
                  className="bg-yellow-400 text-white px-4 py-2 rounded flex items-center"
                  onClick={handleNext}
                  disabled={!isValid}
                >
                  Next <AiOutlineRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Finance Details
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Price
                  </label>
                  <input
                    {...register("price", { required: "Price is required" })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter price"
                    required
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm">
                      {errors.price.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Deposit
                  </label>
                  <input
                    {...register("deposit", {
                      required: "Deposit is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter deposit amount"
                  />
                  {errors.deposit && (
                    <span className="text-red-500 text-sm">
                      {errors.deposit.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Monthly Rent
                  </label>
                  <input
                    {...register("monthly_rent", {
                      required: "Monthly Rent is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter monthly rent"
                  />
                  {errors.monthly_rent && (
                    <span className="text-red-500 text-sm">
                      {errors.monthly_rent.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Maintenance
                  </label>
                  <input
                    {...register("maintenance", {
                      required: "Maintenance is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter maintenance cost"
                  />
                  {errors.maintenance && (
                    <span className="text-red-500 text-sm">
                      {errors.maintenance.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                  onClick={handlePrevious}
                >
                  <AiOutlineLeft className="mr-2" /> Previous
                </button>
                <button
                  type="button"
                  className="bg-yellow-400 text-white px-4 py-2 rounded flex items-center"
                  onClick={handleNext}
                  disabled={!isValid}
                >
                  Next <AiOutlineRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Gallery Images (up to 5)
                </label>
                <input
                  {...register("gallaryimages", {
                    required: "At least one image is required",
                  })}
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  accept="image/*"
                />
                {errors.gallaryimages && (
                  <span className="text-red-500 text-sm">
                    {errors.gallaryimages.message}
                  </span>
                )}
              </div>

              {/* Gallery Preview */}
              <div className="flex gap-2 flex-wrap mt-2">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 border rounded overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                  onClick={handlePrevious}
                >
                  <AiOutlineLeft className="mr-2" />
                  Previous
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={handleNext}
                  disabled={!isValid}
                >
                  Next <AiOutlineRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Purpose
                  </label>
                  <select
                    {...register("purpose", {
                      required: "Purpose is required",
                    })}
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    required
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="rent">Rent</option>
                    <option value="Sell">Sale</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  {errors.purpose && (
                    <span className="text-red-500 text-sm">
                      {errors.purpose.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Type
                  </label>
                  <select
                    {...register("type", { required: "Type is required" })}
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    required
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                  {errors.type && (
                    <span className="text-red-500 text-sm">
                      {errors.type.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Door Facing
                  </label>
                  <select
                    {...register("door_facing", {
                      required: "Type is required",
                    })}
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    required
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                  {errors.door_facing && (
                    <span className="text-red-500 text-sm">
                      {errors.door_facing.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Tenant Type
                  </label>
                  <select
                    {...register("tenant_type", {
                      required: "Type is required",
                    })}
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="group">Group</option>
                  </select>
                  {errors.tenant_type && (
                    <span className="text-red-500 text-sm">
                      {errors.tenant_type.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Bedrooms
                  </label>
                  <input
                    {...register("bedroom", {
                      required: "BedRoom is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter number of bedrooms"
                  />
                  {errors.bedroom && (
                    <span className="text-red-500 text-sm">
                      {errors.bedroom.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Bathrooms
                  </label>
                  <input
                    {...register("bathroom", {
                      required: "Bathroom is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter number of bathrooms"
                  />
                  {errors.bathroom && (
                    <span className="text-red-500 text-sm">
                      {errors.bathroom.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Balconies
                  </label>
                  <input
                    {...register("balcony", {
                      required: "Balcony is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter number of balconies"
                  />
                  {errors.balcony && (
                    <span className="text-red-500 text-sm">
                      {errors.balcony.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    BHK
                  </label>
                  <input
                    {...register("bhk", { required: "Bhk is required" })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter BHK"
                  />
                  {errors.bhk && (
                    <span className="text-red-500 text-sm">
                      {errors.bhk.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Date Listed
                  </label>
                  <input
                    {...register("available_for", {
                      required: "Date Listed is required",
                    })}
                    type="date"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.available_for && (
                    <span className="text-red-500 text-sm">
                      {errors.available_for.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Area
                  </label>
                  <input
                    {...register("area", {
                      required: "Date Listed is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.area && (
                    <span className="text-red-500 text-sm">
                      {errors.area.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Year
                  </label>
                  <input
                    {...register("age", {
                      required: "Date Listed is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.age && (
                    <span className="text-red-500 text-sm">
                      {errors.age.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Additional detail
                  </label>
                  <input
                    {...register("additional_detail", {
                      required: "additional detail is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.additional_detail && (
                    <span className="text-red-500 text-sm">
                      {errors.additional_detail.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    amenities
                  </label>
                  <input
                    {...register("amenities", {
                      required: "amenities detail is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.amenities && (
                    <span className="text-red-500 text-sm">
                      {errors.amenities.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Latitude
                  </label>
                  <input
                    {...register("latitude", {
                      required: "Date Listed is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.latitude && (
                    <span className="text-red-500 text-sm">
                      {errors.latitude.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-lg mb-2">
                    Longitude
                  </label>
                  <input
                    {...register("longitude", {
                      required: "Date Listed is required",
                    })}
                    type="text"
                    className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  />
                  {errors.longitude && (
                    <span className="text-red-500 text-sm">
                      {errors.longitude.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Features
                </label>
                <div className="flex flex-wrap gap-4 mt-1">
                  {[
                    "Home Theater",
                    "2 Stories",
                    "Central Heating",
                    "Dual Sinks",
                    "Electric Range",
                    "Emergency Exit",
                    "Fire Alarm",
                    "Fire Place",
                    "Hurricane Shutters",
                    "Laundry Room",
                    "Lawn",
                    "Marble Floors",
                    "Swimming Pool",
                    "Wifi",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <input
                        {...register("features")}
                        type="checkbox"
                        id={feature.toLowerCase().replace(" ", "-")}
                        className="p-[10px] border rounded-lg w-full border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                      />
                      <label
                        htmlFor={feature.toLowerCase().replace(" ", "-")}
                        className="text-gray-700 text-nowrap"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                  onClick={handlePrevious}
                >
                  <AiOutlineLeft className="mr-2" /> Previous
                </button>
                <button
                  type="button"
                  className="bg-yellow-400 text-white px-4 py-2 rounded flex items-center"
                  onClick={handleNext}
                  disabled={!isValid}
                >
                  Next <AiOutlineRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Map Location
                </label>
                <input
                  {...register("map_location", {
                    required: "Map Location is required",
                  })}
                  type="url"
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                  placeholder="Enter map location URL"
                />
                {errors.map_location && (
                  <span className="text-red-500 text-sm">
                    {errors.map_location.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">
                  Featured Image
                </label>
                <input
                  {...register("photos", {
                    required: "Map Location is required",
                  })}
                  type="file"
                  className="p-[10px] border rounded-lg w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                />
                {errors.photos && (
                  <span className="text-red-500 text-sm">
                    {errors.photos.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                  onClick={handlePrevious}
                >
                  <AiOutlineLeft className="mr-2" /> Previous
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default AddProperty;
