import React, { useEffect, useState } from "react";
import FindYourHome from "../Property/FindYourHome/FindYourHome";
import Rent from "./Rent";
import Request from "../../lib/axios";
import { Pagination } from "@nextui-org/react";

const ForRent = () => {
  const [property, setProperty] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [page, setPage] = useState("1");
  const [filterObj, setFilterObj] = useState({});
  window.scrollTo(0, 0);
  const filterProperties = async (filterData) => {
    setFilterObj(filterData);
    setPage('1')
    const params = new URLSearchParams();
    for (const key in filterData) {
      if (filterData[key]) {
        params.append(key, filterData[key]);
      }
    }
    try {
      const result = await Request.get(
        `/search?page=${page}&purpose=rent&${params.toString()}`
      );
      setProperty(result.data.properties.data || []);
      setPagination(result.data.properties.last_page);
      console.log(result.data.properties.data);
    } catch (error) {
      console.error(error);
      setProperty([]);
      setPagination(null);
    }
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const getProperties = async () => {
    try {
      const result = await Request.get(`/search?purpose=rent&page=${page}`);
      setProperty(result.data.properties.data || []);
      setPagination(result.data.properties.last_page);
    } catch (error) {
      console.error(error);
      setProperty([]);
      setPagination(null);
    }
  };
  useEffect(() => {
  
    getProperties();
  }, []);

  useEffect(() => {
    if (Object.keys(filterObj).length) {
      filterProperties(filterObj);
    }else{
      getProperties()
    }
  }, [page, filterObj]);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row  gap-6 pl-[10px] pr-[10px] lg:p-6 mt-16">
      <div className="lg:sticky lg:top-16 self-start w-full lg:w-80 md:w-[100%]">
        <FindYourHome filterfunc={filterProperties} />
      </div>

      <div className="flex-1">
        <Rent list={property} />
        {pagination && (
          <div className="flex items-center justify-center mt-6 mb-4">
            <Pagination
              total={pagination}
              color="warning"
              initialPage={1}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForRent;
