import { Link, useNavigate } from "react-router-dom";
import { MdBedroomParent } from "react-icons/md";
import HomeImg from "../../../assets/Images/Home-img/slider1.jpeg";
import { GiFloorHatch } from "react-icons/gi";
import { memo, useEffect, useState } from "react";
import ScheduleModel from "../../ScheduleForm/scheduleModel";
import { FaCaretRight } from "react-icons/fa6";
import { Card, Skeleton } from "@nextui-org/react";
const placeholderImage = "https://via.placeholder.com/200";
import { FaBath } from "react-icons/fa";
import { GiPlainSquare } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { propertyTypes } from "../../../constant";

const Properties = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proId, setProId] = useState("");
  const navigate = useNavigate();
  const properties = data.data ||[]
  // const pagination = data.last_page;
  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };

  const onSchecduleModel = () => {
    setIsModalOpen(true);
  };

  // const handelPagination = (page) => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   queryParams.set("page", page);
  //   navigate(`?${queryParams.toString()}`);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);



  if (loading) {
    return (
      <>
        <div className="bg-white py-6 px-4 sm:px-8 md:px-10 lg:px-12">
          <div className="bg-white border gap-6 flex items-center justify-center flex-wrap border-gray-300 shadow-lg rounded-lg mx-auto w-full max-w-6xl p-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-600"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (properties.length <= 0) {
    return (
      <>
        <div className="bg-gray-100 py-6 px-4 sm:px-8 md:px-10 lg:px-12">
          <div className="bg-white border flex items-center justify-center border-gray-300 shadow-lg rounded-lg mx-auto w-full max-w-6xl p-6">
            <p className="border-none "> No Results Found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-100 py-6 pl-[8px] pr-[7px]  lg:px-12 ">
      <div className=" border-gray-300 mx-auto w-full max-w-6xl lg:p-6">
        <h1 className="text-black font-semibold text-lg md:text-2xl mb-8 text-left leading-tight">
          Explore Our Properties
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-5 md:gap-4 sm:gap-4 gap-0">
          {properties?.map((property, index) => (
            <div>
              {index <= 5 && (
                <div
                  key={property.slug}
                  className="flex flex-col rounded-md shadow-lg bg-white mb-6 pt-2 px-2 "
                >
                  <h2 className="text-xl text-black px-2 py-2 font-normal">
                    {property.society.name} -{" "}
                    <span className="text-black capitalize">
                      {property.bhk}BHK {property.type}
                    </span>
                  </h2>
                  <div className="flex flex-col lg:flex-row md:flex-col sm:flex-row px-2 mb-2">
                    <div className="relative w-full">
                      <img
                        src={HomeImg}
                        alt={property.title}
                        className="lg:w-full lg:h-60  h-60 object-cover"
                        onError={(e) => (e.target.src = placeholderImage)}
                      />
                      <div className="absolute top-0 right-[-8px]">
                        {property.purpose === "Rent" ? (
                          <span className="text-white text-sm font-medium me-2 px-4 py-1 bg-[#299729e1]">
                            {property.purpose}
                          </span>
                        ) : property.purpose === "Sell" ? (
                          <span className="text-white text-sm font-medium me-2 px-4 py-1 bg-[#ec894d]">
                            {property.purpose}
                          </span>
                        ) : property.purpose === "upcoming_projects" ? (
                          <span className="capitalize text-white text-sm font-medium me-2 px-4 py-1 pb-1.5 bg-[#292d2d]">
                            {property.purpose}
                          </span>
                        ) : null}
                      </div>

                      <div className="absolute top-0 left-0">
                        {property.highlight_type === "Hot" ? (
                          <span className="text-white text-sm font-medium me-2 px-4 py-1 bg-[#dd3333]">
                            {property.highlight_type}
                          </span>
                        ) : property.highlight_type === "Trending" ? (
                          <span className="text-white text-sm font-medium me-2 px-4 py-1 bg-[#dd8a0d]">
                            {property.highlight_type}
                          </span>
                        ) : null}
                      </div>

                      <button
                        onClick={() => {
                          onSchecduleModel();
                          setProId(property.unique_id);
                        }}
                        className="absolute lg:bottom-0 left-0 flex justify-center items-center gap-2 w-full text-white bg-[#ec894d] hover:bg-[#e7915c] text-sm font-medium px-3 py-1.5"
                      >
                        Schedule a Visit
                        <MdKeyboardDoubleArrowRight size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col lg:w-[70%] gap-2 w-full lg:mt-[-1px] mt-7">
                      <div className="bg-[#4dc7ec] text-white px-3 pb-0  gap-1  items-center md:flex">
                        <p className="text-md  lg:mt-0 md:mt-0 py-1.5 sm:mt-0 text-nowrap">
                          ₹{Number(property.price).toLocaleString("en-IN")}/
                          {property.month || "m"}
                          {"  "}
                          Deposite - ₹{property.deposite || "30000"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-4 -mt-2 sm:grid-cols-4 md:hidden lg:gap-4 text-gray-600  bg-gray-200 border rounded-b-md border-gray-300">
                        {/* Bedroom */}
                        <div className="flex text-nowrap items-center border-r-1 md:border-r-0 justify-center border-b border-gray-500 lg:border-b-0 p-2 text-sm">
                          <MdBedroomParent size={25} className="mr-2" />
                          <span class="font-bold">
                            {property.bedroom} Bedrooms
                          </span>
                        </div>
                        {/* Bathroom */}
                        <div className="flex text-nowrap items-center justify-center border-b border-gray-500 lg:border-b-0 p-2 text-sm">
                          <FaBath size={25} className="mr-2" />
                          <span class="font-bold">
                            {property.bathroom} Bathrooms
                          </span>
                        </div>
                        {/* Area */}
                        <div className="flex text-nowrap items-center border-r-1 md:border-r-0 border-gray-500 justify-center lg:border-b-0 p-2 text-sm">
                          <GiPlainSquare size={20} className="mr-2" />
                          <span class="font-bold">{property.area} sq ft</span>
                        </div>
                        {/* Floor */}
                        <div className="flex text-nowrap  lg:border-b-0 items-center justify-center text-sm">
                          <GiFloorHatch size={25} className="mr-2" />
                          <span class="font-bold">4th Floor</span>
                        </div>
                      </div>
                      <div className=" flex flex-col justify-center gap-3 ml-4 md:ml-0 pr-1 mt-3 lg:ml-2 lg:mt-0">
                        {/* Description Section */}
                        <p
                          className="text-gray-700 max-h-24 ml-1 hidden md:block  overflow-hidden line-clamp-5"
                          dangerouslySetInnerHTML={{
                            __html: property.description,
                          }}
                        ></p>

                        <Link
                          to={`/property/${property.unique_id}`}
                          className="text-white w-fit border  rounded-sm bg-yellow-500 hover:bg-yellow-400 border-none flex items-center justify-center px-2 py-[2px] mb-3"
                        >
                          More Details <FaCaretRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Property Details Section */}
                  <div className="lg:grid grid-cols-2 md:grid-cols-2 hidden lg:grid-cols-4 sm:grid-cols-4 lg:gap-4 text-gray-600  bg-gray-200 border rounded-b-sm -ms-2 -mr-2 border-gray-300">
                    {/* Bedroom */}
                    <div className="flex text-nowrap items-center border-r-1 md:border-r-0 justify-center border-b border-gray-500 lg:border-b-0 p-2 text-sm">
                      <MdBedroomParent size={25} className="mr-2" />
                      <span class="font-bold">{property.bedroom} Bedrooms</span>
                    </div>
                    {/* Bathroom */}
                    <div className="flex text-nowrap items-center justify-center border-b border-gray-500 lg:border-b-0 p-2 text-sm">
                      <FaBath size={25} className="mr-2" />
                      <span class="font-bold">
                        {property.bathroom} Bathrooms
                      </span>
                    </div>
                    {/* Area */}
                    <div className="flex text-nowrap items-center border-r-1 md:border-r-0 border-gray-500 justify-center lg:border-b-0 p-2 text-sm">
                      <GiPlainSquare size={20} className="mr-2" />
                      <span class="font-bold">{property.area} sq ft</span>
                    </div>
                    {/* Floor */}
                    <div className="flex text-nowrap  lg:border-b-0 items-center justify-center text-sm">
                      <GiFloorHatch size={25} className="mr-2" />
                      <span class="font-bold">4th Floor</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 inset-0 bg-black bg-opacity-40 backdrop-blur-sm ">
          <ScheduleModel onClose={() => setIsModalOpen(false)} id={proId} />
        </div>
      )}
    </div>
  );
};

export default memo(Properties);
