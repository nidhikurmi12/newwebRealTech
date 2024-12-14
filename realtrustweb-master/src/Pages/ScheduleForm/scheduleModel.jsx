import React, { memo } from "react";
import ScheduleForm from "./ScheduleForm";

const ScheduleModel = ({onClose,id}) => {
  return (
    <div className="h-screen absolute top-0 w-[93%] lg:w-[40%]">
      <ScheduleForm className="w-64" closeBtn={true} onClose={onClose} id={id}/>
    </div>
  );
};

export default memo(ScheduleModel);
