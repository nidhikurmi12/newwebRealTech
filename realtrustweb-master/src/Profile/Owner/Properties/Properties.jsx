import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertyCard from "./PropertyCard";
import Request from "../../../lib/axios";
import api from "../../../config/api.conf";
import { accessTokenFromLocalStorageOfOwner } from "../../../helper";
import { Link } from "react-router-dom";
import AddProperty from "./AddProperty/AddProperty";

const Properties = ({ onAddPropertyClick }) => {
  const [activeButton, setActiveButton] = useState("All");
  const [propertyList, setPropertyList] = useState([]);
  const [filterFields, setFilterFields] = useState([]);
  const token = accessTokenFromLocalStorageOfOwner();

  const getAllPropertiesOfOwner = async () => {
    try {
      const result = await Request.get(api.viewOwnerPeroperties, {
        headers: {
          Authorization: token,
        },
      });
      setPropertyList(result.data.properties.data);
    } catch (error) {
      console.log(error);
      setPropertyList([]);
    }
  };

  const getAllFilterProperties = async () => {
    const filterObj = {
      status_filter: activeButton,
    };
    try {
      const result = await Request.post(
        api.viewOwnerPropertiesFilter,
        filterObj,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPropertyList(result.data.properties.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const result = await Request.delete(`${api.viewOwnerPeroperties}/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast(result.data.message);
      getAllPropertiesOfOwner();
    } catch (error) {
      console.log(error);
    }
  };

  const setFilterfields = (button) => {
    setActiveButton(button === "Delete" ? "Delete" : button);
  };

  const getAllFiledDetils = async () => {
    try {
      const result = await Request.get(api.ownerDashboard, {
        headers: {
          Authorization: token,
        },
      });

      const results = Object.entries(result.data.counts);

      let total;
      const store = results.map((e, i) => {
        total += e[1];
        return { status: e[0], count: e[1] };
      });

      setFilterFields([{ status: "All", count: total }, ...store]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeButton === "All") {
      getAllPropertiesOfOwner();
    } else {
      getAllFilterProperties();
    }
  }, [activeButton]);

  useEffect(() => {
    getAllPropertiesOfOwner();
    getAllFiledDetils();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-6 bg-white p-3 rounded-md mb-3">
        {filterFields && filterFields.length > 0
          ? filterFields.map((button) => (
              <button
                key={button.status}
                className={`${
                  activeButton === button.status
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300"
                } rounded-md py-2 px-6 flex flex-wrap`}
                onClick={() => setActiveButton(button.status)}
              >
                {button.status}
              </button>
            ))
          : [
              "All",
              "Active",
              "InActive",
              "Reject",
              "Draft",
              "Request",
              "Delete",
              "Expire",
            ].map((button) => (
              <button
                key={button}
                className={`${
                  activeButton === button
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300"
                } rounded-md py-2 px-6 flex flex-wrap`}
                onClick={() => setActiveButton(button)}
              >
                {button} 0
              </button>
            ))}
      </div>
      <div className="bg-gray-50 py-4 px-2 md:p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Properties List
          </h2>
          <button
            onClick={() => [onAddPropertyClick()]}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Add Property
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6">
          <PropertyCard
            property={propertyList}
            deleteProperty={deleteProperty}
          />
        </div>
      </div>
    </>
  );
};

export default Properties;
