import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaShower, FaVectorSquare, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope, FaLine } from 'react-icons/fa';

import { FaCheck } from 'react-icons/fa';
import floorImg from './floor-plan-00.jpg'

const placeholderImage = 'https://via.placeholder.com/400';

const PropertyDetail = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get('https://realtrust.techizebuilder.in/api/properties');
        const properties = response.data.properties;
        const matchedProperty = properties.find(prop => prop.slug === slug);
        if (matchedProperty) {
          setProperty(matchedProperty);
        } else {
          setError('Property not found');
        }
      } catch (error) {
        setError('Error fetching property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-gray-800">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }
  return (
    <div className="w-full p-4 mt-12 lg:p-12">
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg w-full">
        <div className="relative mb-2 p-4 md:p-6">
          <img
            src={property.images && property.images.length > 0 ?
              `https://realtrust.techizebuilder.in/api/properties/${property.images[0]}` :
              placeholderImage}
            alt={property.title}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-lg border border-gray-200"
            onError={(e) => (e.target.src = placeholderImage)}
          />
        </div>

        <div className="mb-6 px-4 md:px-6 relative">
          {/* Slider Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
                <img
                  src={placeholderImage}
                  alt={`Placeholder ${index + 1}`}
                  className="w-full h-[80px] md:h-[100px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-300">
            <h1 className="text-lg px-4 md:text-xl text-gray-900" style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
              {property.title}
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
              <button className="bg-[#181818] font-semibold text-white px-4 py-2 text-sm md:text-lg w-full md:w-auto mb-2 md:mb-0">
                {capitalizeFirstLetter(property.purpose)}
              </button>
              <div className="flex flex-row w-full md:w-auto bg-[#54caee] text-white px-5 py-1 justify-between items-center">
                <span className="text-md font-semibold">₹{property.price.toLocaleString('en-IN')}</span>
                <span className="mx-1" style={{ fontSize: '24px' }}>-</span>
                <span className="text-sm md:text-md">{capitalizeFirstLetter(property.type)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 m-4 mb-4 bg-gray-100 text-gray-700 border border-gray-300 p-2 px-4 md:px-6" style={{ fontSize: '16px' }}>
            <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
              <FaBed className="mr-2" />
              <span className="text-left w-full">{property.bedroom} Bedrooms</span>
            </div>
            <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
              <FaShower className="mr-2" />
              <span className="text-left w-full">{property.bathroom} Bathrooms</span>
            </div>
            <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
              <FaVectorSquare className="mr-2" />
              <span className="text-left w-full">{property.area} sq ft</span>
            </div>
          </div>
          <p className="text-sm md:text-md mb-4 px-4 md:px-6 text-gray-700">
            Location: {property.address}, {property.city}
          </p>
          <p
            className="text-gray-600 px-4 md:px-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: property.description || 'No description available.' }}
          ></p>
        </div>
        <div className="mb-10 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Additional Details</h2>
          <div className="space-y-2">
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">APPLIANCES:       
               </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">BATHROOM DESCRIPTION: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">BEDROOM FEATURES: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">DINING AREA:
               </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">DOORS & WINDOWS:
               </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">ENTRY LOCATION: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">EXTERIOR CONSTRUCTION:
               </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">FIREPLACE FUEL: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">FIREPLACE LOCATION: 

              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">FLOORS: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">GARAGE/PARKING: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">HEATING: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">KITCHEN: Breakfast Nook, Island, Pantry</p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">LAUNDRY: 
              </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">LIVING ROOM:
               </p>
            <p className="px-2 py-2 hover:bg-gray-100 border-t border-gray-300">LOCATION: 
              </p>
          </div>
        </div>
        <div className="bg-white  p-4 mt-4  mb-6">
          <p className="text-lg bg-gray-200 pl-4 text-gray-700 font-semibold mb-4 py-2 border border-gray-300 pb-1">Features</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 ml-4">
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              2 Stories
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2  text-gray-700" size={12} />
              Central Heating
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Dual Sinks
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Electric Range
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Emergency Exit
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Fire Alarm
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Fire Place
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Home Theater
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Hurricane Shutters
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Laundry Room
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Lawn
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Marble Floors
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Swimming Pool
            </li>
            <li className="flex items-center">
              <FaCheck className="mr-2 text-gray-700" size={12} />
              Wifi
            </li>
          </ul>
        </div>
        <div className="mb-20 mt-10 px-4  md:px-6">
          {property.purpose === 'sale' && property.floor_plan && (
            <>
              <div className="flex justify-left mb-4">
                <span className="text-xl bg-gray-600 px-4 py-1  font-semibold  text-white">
                  Floor Plans
                </span>
              </div>
              <img
                src={`https://realtrust.techizebuilder.in/api/properties/${property.floor_plan}`}
                alt="Floor Plan"
                className="w-full h-[500px] object-cover  border border-gray-300"
                onError={(e) => (e.target.src = floorImg)}
              />
            </>
          )}
        </div>
        <div className=" p-2 md:p-6">
          <div className="flex justify-left">
            <span className="text-xl bg-gray-600 px-4 py-1 font-semibold  text-white">
              Property Map
            </span>
          </div>

          <div className="relative h-[200px] md:h-[400px]">
            <iframe
              title="Property Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.497007253567!2d77.5954885!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1662e4a5b943%3A0x7b8a08ad989f7641!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1694045802349!5m2!1sen!2sin"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
        <div className="bg-gray-200  md:m-6 mb-6">
          <div className="flex flex-col md:flex-row justify-start items-center">
            <p className='bg-gray-600 font-bold text-white px-4 py-3 w-full md:w-auto text-left'>Share this</p>
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-0 md:space-y-0 md:space-x-10 items-start md:items-center">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0">
                <FaFacebookF className="mr-2" />
                <span className='hover:text-orange-500'>Facebook</span>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0">
                <FaTwitter className="mr-2" />
                <span className='hover:text-orange-500'>Twitter</span>
              </a>
              <a href={`https://wa.me/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0">
                <FaWhatsapp className="mr-2" />
                <span className='hover:text-orange-500'>WhatsApp</span>
              </a>
              <a href={`mailto:?subject=Check%20out%20this%20property&body=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0">
                <FaEnvelope className="mr-2" />
                <span className='hover:text-orange-500'>Email</span>
              </a>
              <a href={`https://line.me/R/msg/text/?${window.location.href}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 p-2 w-full md:w-auto md:border-0">
                <FaLine className="mr-2" />
                <span className='hover:text-orange-500'>Line</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export default PropertyDetail;