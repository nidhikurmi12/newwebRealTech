import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserPropertyCard = ({ userscheudlehistory = [] }) => {
  console.log(userscheudlehistory);
  if (!Array.isArray(userscheudlehistory)) {
    return <p>No data available.</p>;
  }
  return (
    <div className="flex flex-wrap lg:gap-5 lg:bg-white lg:shadow-md lg:py-6 lg:px-6 w-full rounded-md">
      {userscheudlehistory.length === 0 ? (
        <p className="text-gray-700 text-center">No schedule history found.</p>
      ) : (
        userscheudlehistory.map((schedule) => (
          <div
            key={schedule.id}
            className="max-w-sm bg-white border w-full lg:w-72  border-gray-200 rounded-lg shadow mb-6"
          >
            <div className="p-5">
              <p className="mb-2 text-lg font-semibold text-gray-800">
                Name: {schedule.full_name}
              </p>
              <p className="mb-2 font-normal text-gray-700">
                Email: {schedule.email}
              </p>
              <p className="mb-2 font-normal text-gray-700">
                Visit Type: {schedule.visit_type}
              </p>
              <p className="mb-2 font-normal text-gray-700">
                Company: {schedule.company_name}
              </p>
              <p className="mb-4 font-medium text-gray-800">
                Status:
                <span
                  className={`ml-2 px-3 py-1 text-sm font-medium rounded ${
                    schedule.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {schedule.status}
                </span>
              </p>
              <p className="mb-3 text-sm text-gray-600">
                Created On: {new Date(schedule.created_at).toLocaleString()}
              </p>
              <Link
                to={`/property/${schedule.property_id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-yellow-500  text-white rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

UserPropertyCard.propTypes = {
  userscheudlehistory: PropTypes.array,
};

export default UserPropertyCard;
