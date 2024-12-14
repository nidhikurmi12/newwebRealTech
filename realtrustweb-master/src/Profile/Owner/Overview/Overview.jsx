// src/components/Overview.js
import React from "react";
import Spinner from "../../../Components/spinner";
import { Card, Skeleton } from "@nextui-org/react";

const Overview = ({ profileData }) => {
  const data = profileData && Object.entries(profileData);
 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {profileData ? (
        <>
          {data.map((ele, i) => (
            <div key={i} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
                {ele[0]}
              </h2>
              <p className="text-2xl md:text-4xl font-bold text-gray-900">
                {ele[1]}
              </p>
            </div>
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="w-[200px] space-y-2 p-4" radius="lg">
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
        </>
      )}
    </div>
  );
};

export default Overview;
