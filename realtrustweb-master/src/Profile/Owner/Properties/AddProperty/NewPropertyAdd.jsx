import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import Spinner from "../../../../Components/spinner";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Request from "../../../../lib/axios";
import api from "../../../../config/api.conf";
import { accessTokenFromLocalStorageOfOwner } from "../../../../helper";
import { toast } from "react-toastify";
import { data } from "../../../../constant";
import { LocalityandSociety } from "../../../../contexts/postProperty";
import { TfiReload } from "react-icons/tfi";
function NewPropertyAdd() {
  const [selected, setSelected] = useState();
  const [Society, setSociety] = useState(null);
  const [bhkType, setBhkType] = useState();
  const [apartment, setApartment] = useState();
  const [furnish, setFurnish] = useState();
  const [show, setShow] = useState();
  const [details, setDetails] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
  const [city, setCity] = useState();
  const [features, setSelectedFeatures] = useState([]);
  const [step, setStep] = useState(1);
  const [ani, setAni] = useState([]);

  const searchTimeout = useRef(null);
  const { locality, society } = useContext(LocalityandSociety);
  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm();

  const [items, setItems] = useState(data);

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleSelect = (value) => {
    setSelected(value);
    setShow((value) => !value);
  };
  const handleSelect1 = (value) => {
    setBhkType(value);
  };
  const handleSelect2 = (value) => {
    setApartment(value);
  };
  const handleSelect3 = (value) => {
    setFurnish(value);
  };
  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - selectedImages.length);
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const addPropertyData = async (data) => {
    const amenities = ani.map((e) => e.id);
    const formfiled = new FormData();
    formfiled.append("title", data.title);
    formfiled.append("furnish_type", furnish);
    formfiled.append("city", data.city);
    formfiled.append("locality", data.city);
    formfiled.append("society_name", data.society_name.label);
    formfiled.append("description", data.description);
    formfiled.append("price", data.price);
    formfiled.append("deposit", data.deposit);
    formfiled.append("monthly_rent", data.monthly_rent);
    formfiled.append("maintenance", data.maintenance);
    formfiled.append("floor", data.floor);
    formfiled.append("total_floor", data.total_floor);
    formfiled.append("purpose", selected);
    formfiled.append("type", apartment);
    formfiled.append("image", data.image);
    formfiled.append("door_facing", data.door_facing);
    formfiled.append("tenant_type", data.tenant_type);
    formfiled.append("bedroom", parseInt(data.bedroom));
    formfiled.append("bathroom", parseInt(data.bathroom));
    formfiled.append("balcony", data.balcony);
    formfiled.append("bhk", parseInt(bhkType));
    formfiled.append("available_for", data.available_for);
    formfiled.append("area", data.area);
    formfiled.append("age", data.age);
    formfiled.append("additional_detail", details.join(","));
    formfiled.append("amenities", JSON.stringify(amenities));
    formfiled.append("longitude", data.longitude);
    formfiled.append("latitude", data.latitude);
    formfiled.append("features", JSON.stringify(features));
    formfiled.append("map_location", data.map_location);

    if (selected === "Sell" && data.photos?.[0]) {
      formfiled.append("floor_plan", data.photos[0]);
    }

    if (data.image[0]) {
      formfiled.append("image", data.image[0]);
    }

    selectedImages.forEach((file) => {
      formfiled.append("gallaryimage[]", file);
    });

    for (let [key, value] of formfiled.entries()) {
      console.log(key, value);
    }
    formfiled.append("gallaryimage", selectedImages);
    try {
      const result = await Request.post(api.addPropertyInOwner, formfiled, {
        headers: {
          Authorization: accessTokenFromLocalStorageOfOwner(),
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);

      toast(result.data.message);
      reset();
      setSelectedImages([]);
      setSelected(null);
      setBhkType(null);
      setApartment(null);
      setFurnish(null);
      setSelectedFeatures([]);
      setStep(1);
      setDetails([]);
      setCity(null);
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        const err = Object.entries(error.response.data.errors).map((v) =>
          v[1].join("")
        );
        toast(err[0]);
      } else {
        toast("An unexpected error occurred.");
      }
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

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setSelectedImages([]);
  };
  const handleInputChangeErr = (fieldName) => {
    clearErrors(fieldName);
  };

  const handleNexts = async () => {
    const isValid = await trigger();

    if (isValid) {
      nextStep();
      clearErrors();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-2">
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Listing Details
        </h2>
      </div>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Property Name
          </label>
          <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Property Name is required",
              })}
              onChange={() => handleInputChangeErr("title")}
              className="block flex-1 border-0 indent-3 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Enter Property Name"
            />
          </div>
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="flex gap-3">
          <div>
            <label
              htmlFor="listing_type"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Select the Listing Type
            </label>
            <div className="flex gap-3">
              {/* Rent Button */}
              <button
                type="button"
                onClick={() => {
                  handleSelect("rent");
                  setValue("type", "rent", { shouldValidate: true });
                  handleInputChangeErr("type");
                }}
                className={`rounded-md shadow-sm w-20 py-1 px-3 text-center border ${
                  selected === "rent"
                    ? "border-blue-500 text-black bg-blue-300"
                    : "border-gray-300 text-black bg-white"
                } cursor-pointer`}
              >
                Rent
              </button>

              {/* Sell Button */}
              <button
                type="button"
                onClick={() => {
                  handleSelect("sell");
                  setValue("type", "sell", { shouldValidate: true });
                  handleInputChangeErr("type");
                }}
                className={`rounded-md shadow-sm w-20 py-1 px-3 text-center border ${
                  selected === "sell"
                    ? "border-blue-500 text-black bg-blue-300"
                    : "border-gray-300 text-black bg-white"
                } cursor-pointer`}
              >
                Sell
              </button>
            </div>

            {/* Hidden Input for Validation */}
            <input
              type="hidden"
              {...register("type", { required: "Type is required" })}
            />

            {/* Error Message */}
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="available_for"
            className="block text-sm font-medium text-gray-900"
          >
            Available from
          </label>
          <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
            <input
              type="date"
              id="available_for"
              {...register("available_for", {
                required: "Available date is required",
              })}
              onChange={() => handleInputChangeErr("available_for")}
              className="block flex-1 border-0 indent-2 bg-transparent py-2 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Select Available Date"
            />
          </div>
          {errors.available_for && (
            <p className="mt-1 text-sm text-red-600">
              {errors.available_for.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
            <textarea
              type="text"
              id="title"
              {...register("description", {
                required: "Description is required",
              })}
              onChange={() => handleInputChangeErr("description")}
              className="block flex-1 border-0 indent-3 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Enter description "
            />
          </div>
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {selected ? (
          <div className="typebtnshow">
            <div>
              <label
                htmlFor="property_subtype"
                className="block text-sm font-medium text-gray-900"
              >
                Property Sub Type
              </label>
              <div className="mt-2 flex gap-1.5 gap-y-4 lg:gap-3 flex-wrap">
                <button
                  type="button"
                  value="Apartment"
                  onClick={() => {
                    handleSelect2("Apartment");
                    setValue("Apartment", "Apartment", {
                      shouldValidate: true,
                    });
                    handleInputChangeErr("Apartment");
                  }}
                  className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                    apartment === "Apartment"
                      ? "border-blue-500 text-black bg-blue-300"
                      : "border-gray-300 text-black bg-white"
                  } cursor-pointer`}
                >
                  Apartment
                </button>
                <button
                  type="button"
                  value="Villa"
                  onClick={() => {
                    handleSelect2("Villa");
                    setValue("Apartment", "Villa", { shouldValidate: true });
                    handleInputChangeErr("Villa");
                  }}
                  className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                    apartment === "Villa"
                      ? "border-blue-500 text-black bg-blue-300"
                      : "border-gray-300 text-black bg-white"
                  } cursor-pointer`}
                >
                  Villa
                </button>
                <button
                  type="button"
                  value="Independent Floor"
                  onClick={() => {
                    handleSelect2("Independent Floor");
                    setValue("Apartment", "Independent", {
                      shouldValidate: true,
                    });
                    handleInputChangeErr("Independent");
                  }}
                  className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                    apartment === "Independent Floor"
                      ? "border-blue-500 text-black bg-blue-300"
                      : "border-gray-300 text-black bg-white"
                  } cursor-pointer`}
                >
                  Independent Floor
                </button>
                <button
                  type="button"
                  value="Independent House"
                  onClick={() => {
                    handleSelect2("Independent House");
                    setValue("Apartment", "House", { shouldValidate: true });
                    handleInputChangeErr("House");
                  }}
                  className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                    apartment === "Independent House"
                      ? "border-blue-500 text-black bg-blue-300"
                      : "border-gray-300 text-black bg-white"
                  } cursor-pointer`}
                >
                  Independent House
                </button>
                <input
                  type="hidden"
                  {...register("Apartment", {
                    required: "Apartment Type is required",
                  })}
                />
                {/* Error Message */}
                {errors.Apartment && (
                  <span className="text-red-500 text-sm">
                    {errors.Apartment.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="bhk_type"
                className="block text-sm font-medium text-gray-900 mt-2"
              >
                BHK Type
              </label>
              <div className="mt-2 flex gap-3">
                {Array(4) // Creates an array with 4 slots (for 1BHK to 4BHK)
                  .fill(0)
                  .map((_, index) => {
                    const bhkValue = (index + 1).toString(); // Generate BHK value (e.g., "1", "2", "3", "4")
                    return (
                      <button
                        key={bhkValue} // Unique key for each button
                        type="button"
                        value={`${bhkValue}BHK`}
                        onClick={() => {
                          handleSelect1(bhkValue);
                          setValue("BHK_Type", bhkValue, {
                            shouldValidate: true,
                          });
                          handleInputChangeErr("BHK_Type");
                        }}
                        className={`rounded-md shadow-sm w-20 py-1 px-3 text-center border ${
                          bhkType === bhkValue
                            ? "border-blue-500 text-black bg-blue-300"
                            : "border-gray-300 text-black bg-white"
                        } cursor-pointer`}
                      >
                        {bhkValue}BHK
                      </button>
                    );
                  })}
              </div>
              <input
                type="hidden"
                {...register("BHK_Type", {
                  required: "BHK Type is required",
                })}
              />
              {errors.BHK_Type && (
                <span className="text-red-500 text-sm">
                  {errors.BHK_Type.message}
                </span>
              )}
            </div>
            <div className="flex lg:flex-row gap-3 mt-2 flex-col">
              <div className="w-full">
                <label
                  htmlFor="bedroom"
                  className="block text-sm font-medium text-gray-900"
                >
                  Bedrooms
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    type="number"
                    id="bedroom"
                    {...register("bedroom", {
                      required: "Bedroom is required",
                    })}
                    onChange={() => handleInputChangeErr("bedroom")}
                    className="block flex-1 border-0 indent-3 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Bedrooms"
                  />
                </div>
                {errors.bedroom && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bedroom.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="bathroom"
                  className="block text-sm font-medium text-gray-900"
                >
                  Bathrooms
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    type="number"
                    id="bathroom"
                    {...register("bathroom", {
                      required: "Bathroom is required",
                    })}
                    onChange={() => handleInputChangeErr("bathroom")}
                    className="block flex-1 border-0 indent-3 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Bathrooms"
                  />
                </div>
                {errors.bathroom && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bathroom.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex lg:flex-row gap-3 mt-2 flex-col">
              <div className="w-full">
                <label
                  htmlFor="tenant_type"
                  className="block text-sm font-medium text-gray-900"
                >
                  Tenant Type
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <select
                    type="text"
                    id="tenant_type"
                    {...register("tenant_type", {
                      required: "Tenant Type is required",
                    })}
                    onChange={() => {
                      handleInputChangeErr("tenant_type");
                    }}
                    className="block flex-1 border-0 indent-3  bg-transparent py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  >
                    <option value="">Select</option>
                    <option value="family">Family</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="any">Any</option>
                  </select>
                </div>
                {errors.tenant_type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.tenant_type.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="balcony"
                  className="block text-sm font-medium text-gray-900"
                >
                  Balconies
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    type="text"
                    id="balcony"
                    {...register("balcony", {
                      required: "Balcony is required",
                    })}
                    onChange={() => {
                      handleInputChangeErr("balcony");
                    }}
                    className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Balconies"
                  />
                </div>
                {errors.balcony && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.balcony.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex lg:flex-row flex-col gap-3">
          <div className="w-full">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-900"
            >
              Built-up area(sqft)
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              <input
                type="number"
                id="area"
                {...register("area", { required: "Area is required" })}
                onChange={() => handleInputChangeErr("area")}
                className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Write Area"
              />
            </div>
            {errors.area && (
              <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
            )}
          </div>
          <div className=" w-full">
            <label
              htmlFor="Year"
              className="block text-sm font-medium text-gray-900"
            >
              Year
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              <input
                type="number"
                id="age"
                {...register("age", {
                  required: "Year is required",
                })}
                onChange={() => handleInputChangeErr("age")}
                className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Year"
              />
            </div>
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-3">
          <div className="w-full">
            <label
              htmlFor="City"
              className="block text-sm font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              <select
                name="city"
                id="city"
                className="block rounded-md flex-1 indent-3 w-full bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                {...register("city", { required: "City is required" })}
              >
                <option value="bangloru">Bengaluru</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="locality"
              className="block text-sm font-medium text-gray-900"
            >
              Locality
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              <div className="relative w-full">
                <select
                  id="locality"
                  {...register("locality", {
                    required: "Locality is required",
                  })}
                  onChange={(e) => {
                    handleInputChangeErr("locality");
                    setValue("locality", e.target.value, {
                      shouldValidate: true,
                    }); // Ensure validation triggers
                  }}
                  className="block flex-1 indent-3 w-full bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm appearance-none"
                  style={{
                    overflow: "visible",
                    position: "relative",
                  }}
                  defaultValue="" // Ensures React treats the value as controlled
                >
                  <option value="" disabled>
                    Select a locality
                  </option>
                  {locality.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.locality && (
              <span className="text-red-500 text-sm">
                {errors.locality.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="society_name"
            className="block text-sm font-medium text-gray-900"
          >
            Society name
          </label>
          <div className="mt-2 w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
            <Select
              {...register("society_name", {
                required: "Society name is required",
              })}
              options={society.map((loc) => ({
                value: loc.id,
                label: loc.name,
              }))}
              classNamePrefix="select"
              menuPlacement="auto"
              value={Society}
              menuPortalTarget={document.body}
              onChange={(selectedOption) => {
                setSociety(selectedOption);
                setValue("society_name", selectedOption);
                handleInputChangeErr("society_name");
              }}
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
                control: (provided) => ({
                  ...provided,
                  padding: "0px 6px",
                  cursor: "pointer",
                  borderColor: "#ccc",
                  width: "100%",
                }),
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 300,
                  overflowY: "auto",
                  width: "100%",
                }),
              }}
            />
          </div>
          {errors.society_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.society_name.message}
            </p>
          )}
        </div>

        <div className="flex lg:flex-row gap-2 flex-col">
          <div>
            <label
              htmlFor="furnish_type"
              className="block text-sm font-medium text-gray-900"
            >
              Furnish Status
            </label>
            <div className="mt-2 flex gap-3 flex-wrap">
              <button
                type="button"
                value="Unfurnished"
                onClick={() => {
                  handleSelect3("Unfurnished");
                  setValue("furnish_type", "Unfurnished", {
                    shouldValidate: true,
                  });
                  handleInputChangeErr("furnish_type");
                }}
                className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                  furnish === "Unfurnished"
                    ? "border-blue-500 text-black bg-blue-300"
                    : "border-gray-300 text-black bg-white"
                } cursor-pointer`}
              >
                Unfurnished
              </button>

              <button
                type="button"
                value="Semi Furnished"
                onClick={() => {
                  handleSelect3("Semi Furnished");
                  setValue("furnish_type", "Semi", {
                    shouldValidate: true,
                  });
                  handleInputChangeErr("furnish_type");
                }}
                className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                  furnish === "Semi Furnished"
                    ? "border-blue-500 text-black bg-blue-300"
                    : "border-gray-300 text-black bg-white"
                } cursor-pointer`}
              >
                Semi Furnished
              </button>

              <button
                type="button"
                value="Fully Furnished"
                onClick={() => {
                  handleSelect3("Fully Furnished");
                  setValue("furnish_type", "Fully", {
                    shouldValidate: true,
                  });
                  handleInputChangeErr("furnish_type");
                }}
                className={`rounded-md text-nowrap shadow-sm py-1 px-3 text-center border ${
                  furnish === "Fully Furnished"
                    ? "border-blue-500 text-black bg-blue-300"
                    : "border-gray-300 text-black bg-white"
                } cursor-pointer`}
              >
                Fully Furnished
              </button>
              <input
                type="hidden"
                {...register("furnish_type", {
                  required: "Furnish Type is required",
                })}
              />
            </div>
            {/* Error Message */}
            {errors.furnish_type && (
              <span className="text-red-500 text-sm">
                {errors.furnish_type.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-3">
          <div className="w-full">
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-900"
            >
              Floor
            </label>
            <div className="mt-2 flex rounded-md flex-wrap ring-inset ring-gray-300 sm:max-w-md w-full items-center gap-4">
              <input
                type="number"
                id="floor"
                {...register("floor", { required: "Floor is required" })}
                onChange={() => handleInputChangeErr("floor")}
                className="block flex-1 border indent-3   bg-transparent py-2 pl-1 border-gray-200 rounded-md text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Floor Number"
              />
            </div>
            {errors.floor && (
              <p className="mt-1 text-sm text-red-600">
                {errors.floor.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-900"
            >
              Total Floor
            </label>
            <div className="mt-2 flex rounded-md flex-wrap ring-inset ring-gray-300 sm:max-w-md w-full items-center gap-4">
              <input
                type="number"
                id="total_floor"
                {...register("total_floor", {
                  required: "Total Floor  is required",
                })}
                onChange={() => handleInputChangeErr("total_floor")}
                className="block flex-1 border  border-gray-200 indent-3 rounded-md bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Total Floor"
              />
            </div>
            {errors.total_floor && (
              <p className="mt-1 text-sm text-red-600">
                {errors.total_floor.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  const renderStep3 = () => (
    <div className="space-y-2">
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Finance Details
        </h2>
      </div>
      <div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
            <input
              type="number"
              id="price"
              {...register("price", {
                required: "Price is required",
                validate: (value) => value >= 0 || "Price cannot be negative",
              })}
              onChange={(e) => {
                handleInputChangeErr("price");

                if (e.target.value < 0) {
                  e.target.value = 0;
                }
              }}
              className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm appearance-none"
              placeholder="Amount"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div className="flex lg:flex-row gap-1 mt-3 flex-col w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-900">
              Deposit
            </label>
            <input
              type="number"
              id="deposit"
              {...register("deposit", {
                required: "Deposite is required",
              })}
              onChange={() => handleInputChangeErr("deposit")}
              className="block w-full  mt-2 flex-1 border rounded-md indent-3  bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Deposit"
            />
            {errors.deposit && (
              <p className="mt-1 text-sm text-red-600">
                {errors.deposit.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block font-medium text-gray-700 text-sm ">
              Monthly Rent
            </label>
            <input
              type="number"
              id="monthly_rent"
              {...register("monthly_rent", {
                required: "Monthly Rent is required",
              })}
              onChange={() => handleInputChangeErr("monthly_rent")}
              className="block w-full  flex-1  mt-2 border rounded-md  indent-3  bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Monthly Rent"
            />
            {errors.monthly_rent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.monthly_rent.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block  font-medium text-gray-700 text-sm ">
              Maintenance
            </label>
            <input
              type="number"
              id="maintenance"
              {...register("maintenance", {
                required: "maintenance is required",
              })}
              onChange={() => handleInputChangeErr("maintenance")}
              className="block w-full flex-1  mt-2 border rounded-md indent-3  bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Monthly Rent"
            />
            {errors.maintenance && (
              <p className="mt-1 text-sm text-red-600">
                {errors.maintenance.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-base font-semibold text-gray-900">Gallery Details</h2>
      <div>
        {selected === "Sell" ? (
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Floor Picture
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              <input
                type="file"
                id="image"
                {...register("photos", {
                  required: "photos is required",
                })}
                onChange={() => handleInputChangeErr("photos")}
                className="block flex-1 border-0 indent-3 bg-transparent py-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Ammount"
              />
              {errors.photos && (
                <span className="text-red-500 text-sm">
                  {errors.photos.message}
                </span>
              )}
            </div>
          </div>
        ) : null}
        <div className="mt-2">
          <label
            htmlFor="imageGallery"
            className="block text-sm font-medium text-gray-900"
          >
            Image Gallery
          </label>
          <div className="mt-2 flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
            <label
              htmlFor="imageGallery"
              className="flex w-full items-center justify-between cursor-pointer rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
            >
              <span>Choose an Image</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </label>
            <input
              type="file"
              id="imageGallery"
              name="imageGallery"
              multiple
              accept="image/*"
              {...register("imageGallery", {
                required: "Gallery Image is required",
              })}
              className="hidden"
              onChange={(e) => {
                handleImageChange(e);
                handleInputChangeErr("imageGallery");
              }}
            />
          </div>
          {/* Error Message */}
          {errors.imageGallery && (
            <span className="text-red-500 text-sm">
              {errors.imageGallery.message}
            </span>
          )}

          {/* Display Selected Images */}
          <div className="mt-4 flex gap-3">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                />
                <p
                  onClick={() => {
                    setSelectedImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                  className="absolute top-0 z-10 right-0 text-zinc-300 text-3xl hover:text-4xl cursor-pointer"
                >
                  <IoClose size={23} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-900"
          >
            Feature Image
          </label>
          <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
            <input
              type="file"
              id="image"
              {...register("image", {
                required: "Photos is required",
              })}
              onChange={() => handleInputChangeErr("image")}
              className="block flex-1 border-0 indent-3 bg-transparent py-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </div>
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>
        <div className="w-full">
          <label className="block mt-2 text-gray-700 text-md mb-2 font-semibold">
            Features
          </label>

          <div className=" flex flex-col items-center">
            {/* Cards Section */}
            <div className="flex flex-wrap gap-y-3 gap-x-4 ">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-grow flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[80px] px-5 py-2 cursor-pointer ${
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 transition-transform"
                  }`}
                  onClick={() => !item.disabled && handleCheckboxChange(index)}
                >
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    className="absolute w-0 h-0 opacity-0 "
                    {...register("Features", {
                      required: "Features is required",
                    })}
                    disabled={item.disabled}
                    checked={features.includes(item.k)}
                    onChange={(e) => {
                      setSelectedFeatures((prev) =>
                        e.target.checked
                          ? [...prev, item.k]
                          : prev.filter((v) => v !== item.k)
                      );
                    }}
                    onClick={() => {
                      !item.disabled && handleCheckboxChange(index);
                      handleInputChangeErr("Features");
                    }}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="relative w-full h-full flex flex-col items-center"
                  >
                    <div className="relative flex items-center justify-center w-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-7 h-7 object-cover transition-transform cursor-pointer ${
                          item.checked ? "grayscale-0" : "grayscale"
                        }`}
                      />
                      {item.checked && (
                        <div className="absolute top-0 right-[-16px] w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-center">
                      <h2 className="text-[12px]  font-semibold text-gray-800">
                        {item.title}
                      </h2>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {errors.Features && (
            <span className="text-red-500 text-sm">
              {errors.Features.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
  const renderStep4 = () => (
    <div className="space-y-2">
      <div className="w-full">
        <label
          htmlFor="additional_Details"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Additional Details
        </label>
        <div className="w-full">
          <TagsInput
            value={details}
            onChange={(newValue) => {
              setDetails(newValue);
              setValue("additional_Details", newValue, {
                shouldValidate: true,
              });
              handleInputChangeErr("additional_Details");
            }}
            name="additional_Details"
            placeHolder="Enter Details"
          />
          <input
            type="hidden"
            {...register("additional_Details", {
              required: "Additional Details is required", // Make sure validation is set
            })}
          />
        </div>
        {errors.additional_Details && (
          <p className="mt-1 text-sm text-red-600">
            {errors.additional_Details.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <label
          htmlFor="amenities"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Society Amenities
        </label>
        <div className="w-full">
          <TagsInput
            value={ani.map((e) => e.name)}
            onChange={(newTags) => {
              setAni((prevAni) => {
                const newTagIds = newTags
                  .map((tagName) => {
                    const tag = prevAni.find((item) => item.name === tagName);
                    return tag ? tag.id : null;
                  })
                  .filter((id) => id !== null);
                const updatedAni = prevAni.filter((item) =>
                  newTagIds.includes(item.id)
                );
                return updatedAni;
              });

              setValue("amenity", newTags);
              handleInputChangeErr("amenity");
            }}
          />

          <input
            type="hidden"
            value={ani.map((e) => e.name)}
            {...register("amenity", {
              required: "Amenity is required",
            })}
          />
          {errors.amenity && (
            <div className="flex gap-2 ">
              <p className="mt-1 text-sm text-red-600">
                {errors.amenity.message}
              </p>
              <p className="mt-2">
                {" "}
                <TfiReload className="cursor-pointer" onClick={Amenities} />
              </p>
            </div>
          )}
        </div>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          {/* <label
            for="username"
            class="block text-sm/6 font-medium text-gray-900 "
          >
            Map Location */}
          {/* </label> */}
          {/* <div class="mt-2">
            <div class="flex rounded-md shadow-sm sm:max-w-md">
              <span class="flex items-center pl-3 pr-2 rounded-l-md text-gray-500 sm:text-sm border border-gray-200 outline-none">
                <FaMapMarkerAlt />
                <p className="pl-2">Map Url</p>
              </span>
              <input
                type="text"
                name="map"
                id="map"
                {...register("map_location", {
                  required: "Map Location is required",
                })}
                autocomplete="map"
                class="block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm/6"
                placeholder="Enter Map Location"
              />
            </div>
          </div> */}
          <div className="flex lg:flex-row gap-3 mt-2 flex-col">
            <div className="w-full">
              <label
                htmlFor="Latitude"
                className="block text-sm font-medium text-gray-900"
              >
                Latitude
              </label>
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="text"
                  id="latitude"
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                  onChange={() => handleInputChangeErr("latitude")}
                  className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="23.248"
                />
              </div>
              {errors.latitude && (
                <span className="text-red-500 text-sm">
                  {errors.latitude.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="Longitude"
                className="block text-sm font-medium text-gray-900"
              >
                Longitude
              </label>
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                  type="text"
                  id="longitude"
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                  onChange={() => handleInputChangeErr("longitude")}
                  className="block flex-1 border-0 indent-3  bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="77.443"
                />
              </div>
              {errors.longitude && (
                <span className="text-red-500 text-sm">
                  {errors.longitude.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  async function Amenities() {
    try {
      const result = await Request.get("/amenities");

      setAni((prev) =>
        result.data.data.map((i) => ({
          name: i.name,
          id: i.id,
        }))
      );
    } catch (error) {
      setAni([]);
    }
  }
  useEffect(() => {
    Amenities();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-lg lg:px-8 px-4 py-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Create a Post</h1>
        <form onSubmit={handleSubmit(addPropertyData)} className="space-y-4 ">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 bg-slate-200 py-1 px-4 rounded-sm hover:bg-slate-300"
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNexts}
                className={`flex items-center gap-2 py-1 px-4 rounded-sm bg-green-300 font-semibold `}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleSubmit(addPropertyData)();
                }}
                className="bg-yellow-400 py-1 px-4 text-white font-semibold rounded-sm hover:bg-yellow-500"
              >
                {isSubmitting ? (
                  <>
                    <div className="flex items-center justify-center gap-1">
                      <Spinner props={"w-[3vw] h-[3vh]"} />
                      <p className="text-white">Submiting...</p>
                    </div>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
        </form>

        <div className="flex justify-center mt-8 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                step === i ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewPropertyAdd;
