import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Notifications
      </h2>
      <div className="max-h-[400px] overflow-y-auto">
        <ul>
          {notifications.map((notification) => {
            const data = JSON.parse(notification.data);
            return (
              <li
                key={notification.id}
                className="px-4 py-2 flex lg:flex-row flex-col items-start gap-2  lg:items-center justify-between mb-4 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 shadow-md"
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {data.message}
                  </h3>
                  <p className="text-sm text-gray-600 ">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    data.status === "Reject"
                      ? "bg-red-200 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {data.status}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
