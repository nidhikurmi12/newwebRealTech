import React, { useState, useEffect } from "react";
import FindHomeButton from "../../../Components/FindHomeBtn";
import Request from "../../../lib/axios";
import api from "../../../config/api.conf";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGalleryList = async () => {
    try {
      const result = await Request.get(api.slider);
      setGalleryList(result.data.sliders || []);
      setLoading(false);
      console.log(result);
    } catch (err) {
      setError("Failed to load gallery data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryList();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryList.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + galleryList.length) % galleryList.length
    );
  };

  useEffect(() => {
    if (galleryList.length > 0) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [galleryList]);

  return (
    <div className="relative w-full mt-20">
      <FindHomeButton />

      <div className="relative w-full overflow-visible">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <p>Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Gallery Display */}
        {!loading && !error && galleryList.length > 0 && (
          <>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
              onClick={prevSlide}
            >
              &#10094;
            </button>
            <div className="">
              {galleryList[currentIndex]?.image_url ? (
                <img
                  src={galleryList[currentIndex].image_url}
                  alt={`Gallery ${currentIndex}`}
                  className="w-full h-[550px] object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p>{`Gallery ${currentIndex}`}</p>
                </div>
              )}
            </div>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg z-10"
              onClick={nextSlide}
            >
              &#10095;
            </button>
          </>
        )}
        {/* No Data Fallback */}
        {!loading && !error && galleryList.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p>No gallery images available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
