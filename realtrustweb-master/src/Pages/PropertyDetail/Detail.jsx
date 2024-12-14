import React, {useState } from "react";
import PropertyDetail from "./PropertyDetail";
import ScheduleForm from "../ScheduleForm/ScheduleForm";
import useProperties from "../../hooks/useProperties";

const Detail = () => {
  const [pid, setPid] = useState("");
  window.scrollTo(0, 0);

  const { properties } = useProperties();

  console.log("hkn", properties);

  return (
    <div>
      <div className="flex flex-col md:flex-col lg:flex-row lg:gap-4 mt-20">
        <div className="w-full lg:w-[70%] md:w-full lg:mb-4 md:mb-0">
          <PropertyDetail setPid={setPid} />
        </div>
        <div className="w-full lg:w-[30%] md:w-full lg:pr-4 lg:pl-4 px-2">
          <ScheduleForm id={pid} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
