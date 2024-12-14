import React, { useEffect, useState } from "react";
import FindYourHome from "../Property/FindYourHome/FindYourHome";
import Projects from "./projects";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { Pagination } from "@nextui-org/react";

const UpcomingProject = () => {
  const [property, setProperty] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [page, setPage] = useState("1");
  const [filterObj, setFilterObj] = useState({});
  window.scrollTo(0, 0);
  const filterproperties = async (filterData) => {
    setFilterObj(filterData);
    const params = new URLSearchParams();
    for (const key in filterData) {
      if (filterData[key]) {
        params.append(key, filterData[key]);
      }
    }
    try {
      const result = await Request.get(
        `/search?page=${page}&${params.toString()}`
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

  useEffect(() => {
    const getUpcominProject = async () => {
      try {
        const result = await Request.get(api.upcomingProject);
        setProperty(result.data.properties.data);
        setPagination(result.data.properties.last_page);
      } catch (error) {
        setProperty([]);
        setPagination(null);
      }
    };
    getUpcominProject();
  }, []);

  useEffect(() => {
    if (Object.keys(filterObj).length) {
      filterproperties(filterObj);
    }
  }, [page, filterObj]);

  return (
    <div className="flex flex-col gap-6 md:flex-col lg:flex-row  pl-[10px] pr-[10px] lg:p-6 mt-16">
      <div className="lg:sticky md:top-16 self-start w-full lg:w-80 ">
        <FindYourHome filterfunc={filterproperties} />
      </div>
      <div className="flex-1">
        <Projects list={property} />
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

export default UpcomingProject;
