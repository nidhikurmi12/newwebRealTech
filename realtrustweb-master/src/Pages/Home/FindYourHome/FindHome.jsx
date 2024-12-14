import React, {
  useState,
  useRef,
  useCallback,
  useReducer,
  useContext,
  useMemo,
} from "react";
import Select from "react-select";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaSpinner,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Spinner from "../../../Components/spinner";
import { useNavigate } from "react-router-dom";
import {
  customStyles,
  filterPriceRange,
  furnishTypes,
  propertySubCat,
  propertyTypes,
  societies,
} from "../../../constant";
import { LocalityandSociety } from "../../../contexts/postProperty";

const FindHome = ({ searchBtnLoader, filterprop }) => {
  const initialState = {
    type: "",
    location: "",
    BhkType: "",
    furnish_type: "",
    price: "",
    sub_type: "",
    society: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "locality":
        return { ...state, location: action.value };
      case "Bhk":
        return { ...state, BhkType: action.value };
      case "furnish_type":
        return { ...state, furnish_type: action.value };
      case "price":
        return { ...state, price: action.value };
      case "type":
        return { ...state, type: action.value };
      case "sub_type":
        return { ...state, sub_type: action.value };
      case "society":
        return { ...state, society: action.value };
      default:
        return state;
    }
  }

  const [selectedSociety, setSelectedSociety] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchTimeout = useRef(null);
  const { locality, society } = useContext(LocalityandSociety);
  const navigate = useNavigate();

  const handleSocietyChange = (selectedOptions) => {
    setSelectedSociety(selectedOptions || []);
    const values = selectedOptions.map((option) => option.value);
    dispatch({ type: "society", value: values });
  };
  const handleLocalityChange = (selectedOptions) => {
    setSelectedLocality(selectedOptions || []);
    const values = selectedOptions.map((option) => option.value);
    dispatch({ type: "locality", value: values });
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("type", state.type);
    queryParams.set("location", state.location);
    queryParams.set("bhk", state.BhkType);
    queryParams.set("furnish_type", state.furnish_type);
    queryParams.set("price", state.price);
    queryParams.set("sub_type", state.sub_type);
    queryParams.set("society", state.society);
    navigate(`?${queryParams.toString()}`);
  };

  const closeSearchBox = () => {
    setCities([]);
    dispatch({ type: "location", value: "" });
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
    } catch (error) {
      console.error(error);
    } finally {
      setSearchCitiesLoading(false);
    }
  }, []);

  const localityOptions = useMemo(
    () =>
      locality.map((loc) => ({
        value: loc.id,
        label: loc.name,
      })),
    [locality]
  );
  const societyOptions = useMemo(
    () =>
      society.map((loc) => ({
        value: loc.id,
        label: loc.name,
      })),
    [society]
  );
  const handleInputChange = (e) => {
    const query = e.target.value;
    dispatch({ type: "location", value: query });
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (query) {
      searchTimeout.current = setTimeout(() => {
        searchCities(query);
      }, 500);
    } else {
      closeSearchBox();
    }
  };

  const propertyType = [
    { value: "Sell", label: "Sale" },
    { value: "Rent", label: "Rent" },
    { value: "upcoming_projects", label: "Upcoming Projects" },
  ];

  return (
    <div className="w-full lg:-mt-[40px] sm:mt-0 sm:p-8 md:p-10 lg:p-2 min-w-[200px]">
      <div className="bg-white relative py-6 px-3 mx-auto w-full  rounded-b-lg">
        <h1 className="py-2 absolute top-0 md:top-[-5.7rem] lg:-top-[3.2rem] left-0 border-slate-700 rounded-t-md px-9 w-full inline-block font-semibold text-lg sm:text-3xl text-center md:text-center bg-slate-700 text-white">
          Find Your Home
        </h1>
        {/* Property Type Selection */}
        <div className="flex flex-wrap justify-start w-full md:w-1/2 md:mx-auto gap-2 mb-3 mt-8">
          {propertyType.map((type) => (
            <button
              key={type.value}
              onClick={() => dispatch({ type: "type", value: type.value })}
              className={`py-2 font-bold pr-2 lg:pl-0 text-xl rounded-sm transition-colors duration-300 ease-in-out ${
                state.type === type.value
                  ? "text-yellow-500"
                  : "bg-transparent text-black hover:text-yellow-500"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Locality Selection */}
        <div className="flex justify-center mb-2">

        <div className="flex justify-center mb-2">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <label className="block text-gray-700 font-[14px]  mb-2">
              Select Locality
            </label>
            <Select
              isMulti
              options={localityOptions}
              value={selectedLocality}
              onChange={handleLocalityChange}
              classNamePrefix="select "
              styles={{
                ...customStyles,
                control: (provided) => ({
                  ...provided,
                  padding: "0px 6px",
                  cursor: "pointer",
                  borderColor: "#ccc",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }),
              }}
            />
          </div>
        </div>
          <div className="w-full md:w-2/3 lg:w-1/2">
            <label className="block text-gray-700 font-[14px] mb-2">
              Select Society
            </label>
            {/* <div className="relative">
              <input
                type="text"
                value={state.location}
                onChange={handleInputChange}
                className="py-[6px] px-[6px] indent-2 border rounded-md  w-full border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
                placeholder="Search cities..."
              />
              {searchCitiesLoading ? (
                <div className="absolute top-2 right-3 w-6 h-6">
                  <Spinner />
                </div>
              ) : (
                cities.length > 0 && (
                  <IoClose
                    onClick={closeSearchBox}
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
                        dispatch({ type: "location", value: city.name });
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
            </div> */}
            <Select
              isMulti
              options={societyOptions}
              value={selectedSociety}
              onChange={handleSocietyChange}
              classNamePrefix="select"
              styles={{
                ...customStyles,
                control: (provided) => ({
                  ...provided,
                  padding: "0px 6px",
                  cursor: "pointer",
                  borderColor: "#ccc",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }),
              }}
            />
          </div>
        </div>

        {/* Societies and BHK Type Selection */}
      
        <div className="flex justify-center mb-2">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <label className="block text-gray-700 font-[14px]  mb-2">
              BHK Type
            </label>
            <Select
              isMulti
              options={[
                { value: "1", label: "1 BHK" },
                { value: "2", label: "2 BHK" },
                { value: "3", label: "3 BHK" },
                { value: "4", label: "4 BHK" },
              ]}
              onChange={(selectedOptions) => {
                const values = selectedOptions.map((option) => option.value);
                dispatch({ type: "Bhk", value: values });
              }}
              styles={{
                ...customStyles,
                control: (provided) => ({
                  ...provided,

                  padding: "0px 4px",

                  cursor: "pointer",
                  borderColor: "#ccc",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }),
              }}
              placeholder="Select BHK Type"
            />
          </div>
        </div>
        <div className="flex justify-end mt-3 w-[86%]">
          <div className="w-full md:w-2/3 lg:w-1/3">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-black flex items-center text-lg font-semibold transition-colors duration-300 ease-in-out focus:outline-none mb-4 md:mb-0"
            >
              {showMoreFilters ? (
                <>
                  <div className="mr-2 border flex justify-center p-1 items-center border-black  shadow-md hover:bg-gray-200 hover:text-black">
                    <FaMinus className=" w-2 h-2 text-sm" />
                  </div>
                  <p class="text-[14px] text-black">Less Filters</p>
                </>
              ) : (
                <>
                  <div className="mr-2 border flex justify-center p-1 items-center border-black  hover:bg-gray-200 hover:text-black">
                    <FaPlus className=" w-2 h-2 text-sm" />
                  </div>
                  <p class="text-[14px] text-black">
                    Show recently posted properties
                  </p>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Advanced Filters Toggle */}

        {/* Additional filters with transition */}
        <div
          className={`transition-all duration-300 ease-in-out mt-3 ${
            showMoreFilters
              ? "max-h-[200px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-wrap gap-6 justify-center mb-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Select
                options={filterPriceRange}
                styles={{
                  ...customStyles,
                  control: (provided) => ({
                    ...provided,

                    padding: "0px 4px",

                    borderColor: "#ccc",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }),
                }}
                onChange={(e) => dispatch({ type: "price", value: e.value })}
                placeholder="Select Price Range"
              />
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Select
                options={propertySubCat}
                styles={{
                  ...customStyles,
                  control: (provided) => ({
                    ...provided,
                    padding: "0px 4px",
                    borderColor: "#ccc",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }),
                }}
                onChange={(e) => dispatch({ type: "sub_type", value: e.value })}
                placeholder="Select Property Sub-Type"
              />
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Select
                onChange={(e) =>
                  dispatch({ type: "furnish_type", value: e.value })
                }
                options={furnishTypes}
                styles={{
                  ...customStyles,
                  control: (provided) => ({
                    ...provided,

                    padding: "0px 4px",

                    borderColor: "#ccc",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }),
                }}
                placeholder="Select Furnishing Type"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <div className="md:w-2/3 lg:w-1/2 flex flex-col md:flex-row justify-center w-full items-center mt-2">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`flex items-center justify-center w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 transition-colors duration-300 ease-in-out ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 hover:opacity-90 text-white"
              }`}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSearch className="mr-2" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHome;
