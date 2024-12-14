import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import Spinner from "../../../Components/spinner";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import {
  bhkCategory,
  customStyles,
  filterPriceRange,
  furnishTypes,
  propertycategory,
  propertySubCat,
  propertySubfloor,
  propertyTypes,
} from "../../../constant";
import { LocalityandSociety } from "../../../contexts/postProperty";
const FindYourHome = ({ filterfunc }) => {
  const [selectedLocality, setSelectedLocality] = useState([]);
  const initialState = {
    purpose: "",
    location: "",
    bhk: "",
    furnish_type: "",
    price: "",
    Property_type: "",
    type: "",
    floor: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "locality":
        return { ...state, location: action.value };
      case "Bhk":
        return {
          ...state,
          bhk: action.value,
        };
      case "furnish_type":
        return {
          ...state,
          furnish_type: action.value,
        };
      case "price":
        return {
          ...state,
          price: action.value,
        };
      case "purpose":
        return {
          ...state,
          purpose: action.value,
        };
      case "Propertytype":
        return {
          ...state,
          Property_type: action.value,
        };
      case "type":
        return {
          ...state,
          type: action.value,
        };
      case "floor":
        return {
          ...state,
          floor: action.value,
        };
    }
  }
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cities, setCities] = useState([]);
  const searchTimeout = useRef(null);
  const { locality } = useContext(LocalityandSociety);
  const localityOptions = useMemo(
    () =>
      locality.map((loc) => ({
        value: loc.id,
        label: loc.name,
      })),
    [locality]
  );
  const handleLocalityChange = (selectedOptions) => {
    setSelectedLocality(selectedOptions || []);
    const values = selectedOptions.map((option) => option.value);
    dispatch({ type: "locality", value: values });
  };
  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
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

  return (
    <div className="w-full p-4 bg-gray-100 shadow-md mt-9 ">
      <h1 className="text-2xl font-semibold text-yellow-600 mb-6">
        Find Your Home
      </h1>

      <div className="w-full mb-2">
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
      <div className="space-y-4">
        {/* <Select
          options={propertyTypes}
          styles={customStyles}
          placeholder="Looking For"
          onChange={(e) => dispatch({ type: "purpose", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        /> */}
        {/* <Select
          options={propertycategory}
          styles={customStyles}
          placeholder="Property Type"
          onChange={(e) => dispatch({ type: "Propertytype", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        /> */}
        <Select
          options={bhkCategory}
          styles={{
            ...customStyles,
            control: (provided) => ({
              ...provided,
              padding: "0 4px",
              borderColor: "#ccc",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }),
          }}
          placeholder="BHK Type"
          onChange={(e) => dispatch({ type: "Bhk", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        />
        <Select
          options={furnishTypes}
          styles={{
            ...customStyles,
            control: (provided) => ({
              ...provided,
              padding: "0 4px",
              borderColor: "#ccc",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }),
          }}
          placeholder="Furnish Type"
          onChange={(e) => dispatch({ type: "furnish_type", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        />

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
          placeholder="Select Price Range"
          onChange={(e) => dispatch({ type: "price", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        />
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
          placeholder="Select Property Sub-Type"
          onChange={(e) => dispatch({ type: "type", value: e.value })}
          className="basic-single"
          classNamePrefix="select"
        />

        <input
          type="number"
          placeholder="Select Floor"
          className="py-[6px] px-[6px] indent-2 border rounded-md w-full shadow-inner border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ease-in-out"
          onChange={(e) => dispatch({ type: "floor", value: e.value })}
        />
        {/* <button
          onClick={toggleMoreFilters}
          className="flex items-center text-yellow-600 hover:text-yellow-800 focus:outline-none"
        >
          {showMoreFilters ? (
            <>
              <FaChevronUp className="mr-2" />
              Less Filters
            </>
          ) : (
            <>
              <FaChevronDown className="mr-2" />
              Advanced Filters
            </>
          )}
        </button> */}
        {/* {showMoreFilters && (
          <div className="space-y-4 mt-4">
            <Select
              options={filterPriceRange}
              styles={customStyles}
              placeholder="Select Price Range"
              onChange={(e) => dispatch({ type: "price", value: e.value })}
              className="basic-single"
              classNamePrefix="select"
            />
            <Select
              options={propertySubCat}
              styles={customStyles}
              placeholder="Select Property Sub-Type"
              onChange={(e) => dispatch({ type: "type", value: e.value })}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
        )} */}
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            filterfunc(state);
          }}
          className="w-full flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </div>
    </div>
  );
};

export default FindYourHome;
