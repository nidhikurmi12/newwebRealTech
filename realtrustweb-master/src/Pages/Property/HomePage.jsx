import React from "react";
import Property from "./Property";
import FindYourHome from "./FindYourHome/FindYourHome";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 mt-2">
      <div>
        <FindYourHome />
      </div>
      <div>
        <Property />
      </div>
    </div>
  );
};

export default HomePage;