import React, { useEffect, useState } from "react";
import Request from "../../../lib/axios";
import api from "../../../config/api.conf";
import { accessTokenFromLocalStorageOfUser } from "../../../helper";

// Date formatting helper
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPaymentHistory = async (page = 1) => {
    try {
      const result = await Request.get(
        `${api.userPaymentHistory}?page=${page}`,
        {
          headers: {
            Authorization: accessTokenFromLocalStorageOfUser(),
          },
        }
      );
      const data = result.data.data;
      setPaymentHistory(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error(error.response || error.message);
    }
  };

  useEffect(() => {
    fetchPaymentHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredHistory = paymentHistory.filter(
    (ele) =>
      ele.property?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ele.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const numberList = [10, 20, 40, 50, 100];
  return (
    <div className="md:p-5 w-full h-auto bg-gray-100">
      <h1 className="text-xl mb-2 font-bold">Your Payment History</h1>

      <div className="flex items-center rounded-lg shadow justify-between flex-col space-y-4 mb-2 md:flex-row md:space-y-0 py-4 px-4 bg-white">
        {/* Action Button */}

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pt-2 pb-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden overflow-auto max-h-[400px] rounded-lg shadow md:block">
        <table className="w-full">
          <thead className="bg-gray-200 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Property Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Method
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Date & Time
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Total
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left sticky top-0 bg-gray-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredHistory.map((ele, i) => (
              <tr className="bg-white" key={i}>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <div className="text-base font-semibold">
                    {ele.property?.title || "N/A"}
                  </div>
                  <div className="font-normal text-gray-500">
                    {ele.property_id}
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {ele.email || "N/A"}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {ele.method || "N/A"}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {formatDateTime(ele.updated_at)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {ele.currency} {ele.amount}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    className={`flex items-center justify-center h-6 text-xs font-medium uppercase tracking-wide rounded-md bg-opacity-35 whitespace-nowrap ${
                      ele.status === "completed"
                        ? "bg-green-500 text-green-700"
                        : ele.status === "pending"
                        ? "bg-yellow-500 text-yellow-700"
                        : ele.status === "success"
                        ? "bg-blue-500 text-blue-700"
                        : "bg-red-500 text-red-700"
                    }`}
                  >
                    {ele.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredHistory.map((ele, i) => (
          <div className="bg-white space-y-3 p-4 rounded-lg shadow" key={i}>
            <div className="flex flex-col text-sm">
              <div className="flex gap-4">
                <div>
                  <a
                    href="#"
                    className="text-blue-500 font-bold hover:underline"
                  >
                    {ele.property_id}
                  </a>
                </div>
                <div className="">{ele.method}</div>
                <div>
                  <span
                    className={`w-[90px] flex items-center justify-center h-6 text-xs font-medium uppercase tracking-wide rounded-md bg-opacity-35 whitespace-nowrap ${
                      ele.status === "completed"
                        ? "bg-green-500 text-green-700"
                        : ele.status === "pending"
                        ? "bg-yellow-500 text-yellow-700"
                        : "bg-red-500 text-red-700"
                    }`}
                  >
                    {ele.status || "Pending"}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                {ele.property?.title || "N/A"}
              </div>
              <div className="">{ele.email}</div>
              <div className="flex gap-4">
                <div className="">{formatDateTime(ele.updated_at)}</div>
              </div>
              <div className="text-sm text-black font-medium">
                {ele.currency} {ele.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
