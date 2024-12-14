import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Ensure this is imported if you're using navigation
import { useRef } from "react";
export const SwiperSlider = ({ imageslist, imagefunc }) => {
  console.log(imageslist);
  const swiperRef = useRef(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  return (
    <div className="relative">
      <Swiper
        onSlideChange={() => console.log("slide change")}
        slidesPerView={4}
        onSwiper={(swiper) => {
          console.log(swiper);
          swiperRef.current = swiper;
        }}
        spaceBetween={4}
        className="w-full md:w-[90%] mb-1"
      >
        {imageslist.map((image, index) => (
          <SwiperSlide key={index}>
            <div class="w-full relative mx-auto h-auto overflow-hidden rounded-md ">
              <img
                src={image.image_url}
                alt={`Slide ${index + 1}`}
                className="object-cover h-[18vh] w-[30vh] hover:cursor-pointer relative z-0 rounded-lg transition-all duration-300 hover:scale-110 "
                onClick={() => imagefunc(image.image_url)}
              />
            </div>
          </SwiperSlide>
        ))}
        <button
          onClick={handlePrevSlide}
          className="swiper-button-prev text-black font-extrabold absolute"
        ></button>
        <button
          onClick={handleNextSlide}
          className="swiper-button-next text-black font-extrabold mr-4 absolute"
        ></button>
      </Swiper>
    </div>
  );
};
