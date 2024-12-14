import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import "../PropertyDetail/one.css";
import {
  FaBed,
  FaShower,
  FaVectorSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
  FaLine,
} from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaFilePdf } from "react-icons/fa6";
import { useRazorpay } from "react-razorpay";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import floorImg from "./floor-plan-00.jpg";
import { GiFloorHatch } from "react-icons/gi";
import Amenities from "./Aminity";
import { SwiperSlider } from "./imageslider";
import Spinner from "../../Components/spinner";
import { Helmet } from "react-helmet";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import { useForm } from "react-hook-form";
import { accessTokenFromLocalStorageOfUser } from "../../helper";
import { ProfileContext } from "../../contexts/profileContext";
import { toast } from "react-toastify";
import MapComponent from "./Map";
const placeholderImage = "https://via.placeholder.com/400";

const PropertyDetail = ({ setPid, userProfileData }) => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [amenity, setAmenity] = useState([]);
  setPid(slug);
  const token = accessTokenFromLocalStorageOfUser();
  const { userProfile } = useContext(ProfileContext);

  const { error, isLoading, Razorpay } = useRazorpay();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const timeoutRef = useRef(null);
  const fetchProperty = async () => {
    try {
      const response = await Request.get(`/properties/${slug}/show`);
      const properties = response.data.data;
      setProperty(properties);
      setImageurl(properties.gallery[0].image_url);
    } catch (error) {
      setError("Error fetching property details");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const amenities = async () => {
    try {
      const result = await Request.get(api.amenities);
      setAmenity(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperty();
    amenities();
  }, [slug]);

  if (loading) {
    return <Spinner props={"w-16 h-16 absolute top-[50%] left-[30%]"} />;
  }
  if (err) {
    return <div className="text-center text-red-600">{error}</div>;
  }
  const setImageurlfunc = (url) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setImageurl(url);
    setTimeout(() => {
      setImageurl(null);
      timeoutRef.current = null;
    }, 7000);
  };

  const colors = [
    "bg-[#57ebde]",
    "bg-[#07f49e]",
    "bg-[#32c4c0]",
    "bg-[#f89b29]",
    "bg-[#eca0ff]",
    "bg-[#30c5d2]",
    "bg-[#beb15b]",
    "bg-[#b89c93]",
    "bg-[#60efff]",
    "bg-[#0061ff]",
    "bg-[#696eff]",

    "bg-[#f2c1ea]",
    "bg-[#1c90bf]",
  ];

  const onSubmit = async () => {
    try {
      const response = await Request.post(
        api.userPay,
        {
          property_id: slug,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Inside the payment");
        const { key, amount, order_id } = response.data;
        await PaymentComponent(key, amount, order_id);
      }
    } catch (error) {
      if (error.status == 401) {
        toast("Login To proceed");
      } else {
        toast("Something went wrong");
      }
    }
  };
  const getEmbedUrl = (url) => {
    const match = url.match(/v=([^&]+)/); // Extract YouTube video ID
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  const PaymentComponent = async (key, amount, order_id) => {
    const handlePayment = () => {
      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "Real Trust",
        description: "Property Purchased",
        order_id: order_id,
        handler: async (response) => {
          try {
            console.log(response);
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;
            const verifyPayment = await Request.post(
              "/user/verify-payment",
              {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                signature: razorpay_signature,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            alert("Payment Successful!");
          } catch (error) {
            alert("Payment failed!");
          }
        },
        prefill: {
          name: userProfile.name,
          email: userProfile.email,
          contact: userProfile.mobile_no,
        },
        theme: {
          color: "gray",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    };
    handlePayment();
  };
  const shareUrl = `http://localhost:5173/property/${property?.slug || "#"}`;
  const defaultImage = property.gallery[0].image_url;
  const defaultDescription = property.description;
  return (
    <>
      <Helmet>
        <title>{property.title || "Property Details"}</title>
        <meta
          name="description"
          content={property.description || defaultDescription}
        />
        <meta
          name="keywords"
          content="real estate, property, buy property, rent property, homes"
        />
        <meta
          property="og:title"
          content={property.title || "Property Details"}
        />
        <meta
          property="og:description"
          content={property.description || defaultDescription}
        />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content={property.title || "Property Details"}
        />
        <meta
          name="twitter:description"
          content={property.description || defaultDescription}
        />
        <meta name="twitter:image" content={defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="w-full lg:p-4 p-[7px]">
        <div className="bg-white shadow-lg border border-gray-300 rounded-lg pb-3">
          <div className="relative mb-2 p-4 md:p-6">
            <div className="w-full lg:w-[100%] md:w-full h-auto object-cover rounded-lg mb-4">
              {property.purpose === "upcoming_projects" ? (
                <Suspense fallback={<Spinner />}>
                  <Slide>
                    {property.gallery && property.gallery.length > 0 ? (
                      property.gallery
                        .filter(
                          (item) =>
                            item.name && item.name.includes("youtube.com")
                        )
                        .map((video, index) => (
                          <div className="each-slide" key={index}>
                            <iframe
                              src={getEmbedUrl(video.name)}
                              title={`Video ${index + 1}`}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover rounded-lg border border-gray-200"
                            ></iframe>
                          </div>
                        ))
                    ) : (
                      <div className="each-slide">
                        <p>No videos available</p>
                      </div>
                    )}
                  </Slide>
                </Suspense>
              ) : (
                <Slide>
                  {property.gallery && property.gallery.length > 0 ? (
                    property.gallery.map((image, index) => (
                      <div className="each-slide" key={index}>
                        <img
                          src={
                            imageurl ||
                            image.url ||
                            image.image_url ||
                            placeholderImage
                          }
                          alt={property.title}
                          className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover rounded-lg border border-gray-200"
                          onError={(e) => (e.target.src = placeholderImage)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="each-slide">
                      <img
                        src={placeholderImage}
                        alt="Placeholder"
                        className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </Slide>
              )}
            </div>
            {property.purpose !== "upcoming_projects" && (
              <SwiperSlider
                imageslist={property.gallery}
                imagefunc={setImageurlfunc}
              />
            )}
          </div>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-3 bg-gray-300">
              <h1
                className="text-lg py-2 px-4 md:text-xl text-gray-900"
                style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
              >
                {property.title}
              </h1>
              <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
                {(property.purpose === "Sell" ||
                  property.purpose === "Rent") && (
                  <button
                    onClick={onSubmit}
                    className="bg-[rgb(240,140,58)] text-nowrap hover:bg-yellow-600 hover:text-white text-white font-semibold px-4 py-2 text-sm md:text-lg w-full md:w-auto mb-2 md:mb-0"
                  >
                    Payment Now
                  </button>
                )}
                <button className="bg-[#181818] text-nowrap font-semibold text-white px-4 py-2 text-sm md:text-lg w-full md:w-auto md:mb-0">
                  For {capitalizeFirstLetter(property.purpose)}
                </button>
                {property.purpose === "Sell" || property.purpose === "Rent" ? (
                  <div className="flex flex-row w-full md:w-auto bg-[#54caee] text-white px-5 py-1 justify-between items-center">
                    <span className="text-md font-semibold">
                      ₹
                      {Number(property.price).toLocaleString("en-IN") ||
                        "25000"}
                    </span>
                    <span className="mx-1 -mt-1" style={{ fontSize: "24px" }}>
                      -
                    </span>
                    <span className="text-sm md:text-md">
                      {capitalizeFirstLetter(property.type)}
                    </span>
                  </div>
                ) : property.purpose === "upcoming_projects" ? (
                  <div className="bg-[#54caee] text-nowrap font-semibold text-white px-4 py-2 text-sm md:text-lg w-full md:w-auto md:mb-0">
                    <span className="text-md font-semibold text-nowrap">
                      ₹{property.price_range}
                    </span>
                  </div>
                ) : null}
                {property.purpose === "upcoming_projects" && (
                  <a
                    href={property.pdf_file_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button
                      className="
                      bg-[rgb(240,140,58)] 
                      hover:bg-yellow-600 
                      text-white 
                      font-semibold 
                      text-sm md:text-lg 
                      px-4 py-2 
                      w-full  
                      mb-2 md:mb-0"
                      title={
                        property.pdf_file_url
                          ? "Download PDF"
                          : "No PDF available"
                      }
                      disabled={!property.pdf_file_url}
                    >
                      {property.pdf_file_url ? (
                        <p className="flex w-full items-center gap-2 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                          <FaFilePdf size={25} className="flex-shrink-0" />
                          {property.pdf_file}
                        </p>
                      ) : (
                        "No PDF Available"
                      )}
                    </button>
                  </a>
                )}
              </div>
            </div>
            {property.purpose !== "upcoming_projects" && (
              <div
                className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-8 lg:m-0 md:m-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 md:p-2 lg:p-0 lg:px-4 md:px-6"
                style={{ fontSize: "16px" }}
              >
                <div className="flex items-center border-b py-[5px] px-[10px] border-gray-500 md:border-b-0 w-full md:w-auto justify-center md:justify-start">
                  <FaBed className="mr-2" size={30} />
                  <span className="text-left w-full">
                    {property.bedroom} Bedrooms
                  </span>
                </div>
                <div className="flex items-center py-[5px] px-[10px] border-b border-gray-500 md:border-b-0 w-full md:w-auto justify-center md:justify-start">
                  <FaShower className="mr-2" size={25} />
                  <span className="text-left w-full">
                    {property.bathroom} Bathrooms
                  </span>
                </div>
                <div className="flex items-center border-b py-[5px] px-[10px] border-gray-500 md:border-b-0 w-full md:w-auto justify-center md:justify-start">
                  <FaVectorSquare className="mr-2" size={25} />
                  <span className="text-left w-full">
                    {property.area} sq ft
                  </span>
                </div>
                <div className="flex items-center py-[5px] px-[10px] w-full md:w-auto justify-center md:justify-start">
                  <GiFloorHatch className="mr-2" size={30} />
                  <span className="text-left w-full">4th Floor</span>
                </div>
                <div className="flex items-center  py-[5px] px-[10px] border-t lg:border-none border-gray-500 md:border-b-0 w-full md:w-auto justify-center md:justify-start">
                  <SlCalender className="mr-2" size={25} />
                  <span className="text-left w-full">
                    {property.available_for}
                  </span>
                </div>
              </div>
            )}

            <p className="text-lg md:text-md mb-1 px-4 md:px-6 text-gray-700 mt-3">
              <span className="font-bold">Location:</span> {property.address}
              {property.city.city_name}
            </p>
            <p className="text-lg md:text-md  px-4 md:px-6 text-gray-700 mt-1">
              <span className="font-bold">Maintenance:</span>{" "}
              {property.maintenance}
            </p>
            <p className="text-lg md:text-md px-4 mb-3 md:px-6 text-gray-700 mt-1">
              <span className="font-bold">Furnish Type:</span>{" "}
              {property.furnish_type}
            </p>
            <p
              className="text-gray-600 px-3 md:px-6 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: property.description || "No description available.",
              }}
            ></p>
          </div>
          <div className="mb-10 px-2 md:px-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              Additional Details
            </h2>
            <div className="bg-white properties-data-icon rounded-lg shadow-md border list-none border-gray-300 gap-3 p-4 flex flex-wrap w-full">
              {property.additional_details &&
              Array.isArray(JSON.parse(property.additional_details)) ? (
                JSON.parse(property.additional_details).map((detail, i) => {
                  const detailValue = detail.value || detail;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center gap-2"
                    >
                      <VscDebugBreakpointDataUnverified size={15} />

                      {detailValue.split(",").map((item, j) => {
                        // Assign background color based on a combination of indices
                        const spanBgColor = colors[(i + j) % colors.length];
                        return (
                          <span
                            key={j}
                            className={`flex items-center font-semibold justify-center py-2 px-3 lg:px-4 lg:text-[12px] lg:py-1 text-[10px] capitalize opacity-90 md:text-md ${spanBgColor} rounded-md text-black`}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <p>No additional details available.</p>
              )}
            </div>
          </div>
          <div className="bg-white px-2 md:px-4  py-2">
            <Amenities amenities={amenity} />
          </div>
          <div>
            {property.purpose === "Sell" && property.floor_plan && (
              <>
                <div className="mb-6 mt-10 px-4 md:px-6">
                  <div className="flex justify-left">
                    <span className="text-xl bg-gray-600 px-4 py-1font-semibold text-white">
                      Floor Plans
                    </span>
                  </div>
                  <img
                    src={property.floor_plan}
                    alt="Floor Plan"
                    className="w-full h-[500px] object-cover border border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = floorImg;
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className=" p-2 md:px-6 pt-3">
            <div className="w-full">
              <span className="text-xl bg-gray-600 px-4 py-1 font-semibold  text-white">
                Property Map
              </span>
              <MapComponent lat={property.latitude} lng={property.longitude} />
            </div>
          </div>

          <div className="bg-gray-200 md:mx-6 mt-[-8px] ml-[8px] mr-[8px]">
            <div className="flex flex-col md:flex-row justify-start items-center">
              {/* Header */}
              <p className="bg-gray-600 font-bold text-white px-4 py-3 w-full md:w-auto text-left">
                Share this
              </p>

              <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-10 items-start md:items-center">
                {[
                  {
                    href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                    icon: <FaFacebookSquare className="mr-2" size={25} />,
                    label: "Facebook",
                  },
                  {
                    href: `https://twitter.com/intent/tweet?url=${shareUrl}`,
                    icon: <FaTwitterSquare className="mr-2" size={25} />,
                    label: "Twitter",
                  },
                  {
                    href: `https://wa.me/?text=${encodeURIComponent(
                      `Check out this property: ${
                        property?.description ||
                        "Amazing property available now!"
                      }\n${shareUrl}\nImage: ${
                        property?.image || "default-image-url.jpg"
                      }`
                    )}`,
                    icon: <FaWhatsappSquare className="mr-2" size={25} />,
                    label: "WhatsApp",
                  },
                  {
                    href: `mailto:?subject=Check%20out%20this%20property&body=${encodeURIComponent(
                      `Check out this property: ${
                        property?.description ||
                        "Amazing property available now!"
                      }\n\nView details: ${shareUrl}\n\nImage: ${
                        property?.image || "default-image-url.jpg"
                      }`
                    )}`,
                    icon: <MdMarkEmailUnread className="mr-2" size={25} />,
                    label: "Email",
                  },
                  {
                    icon: <FaLine className="mr-2" size={25} />,
                    label: "Line",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0"
                  >
                    {item.icon}
                    <span className="hover:text-orange-500">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default PropertyDetail;
