import React from "react";
import Contact from "./Contact";
import img1 from "../../assets/Images/Home-img/slider3.jpeg";

window.scrollTo(0, 0);

const MainContact = () => {
  return (
    <div className="">
      <div className="mt-[87px]">
        <img src={img1} alt=""  className="h-[200px] md:h-auto"/>
      </div>

      <div className="lg:p-6 mt-4 pl-[10px] pr-[10px]">
        <div>
          <Contact />
        </div>
      </div>
      
    </div>
  );
};

export default MainContact;